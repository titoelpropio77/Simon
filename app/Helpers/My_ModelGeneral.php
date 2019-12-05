<?php
namespace App\Helpers;
use DB;
use Schema;
class My_ModelGeneral
{

	const TABLE_NAME = null;
	const ID_FIELD = null;
	const DELETE_FIELD = null;
	const DELETE_STATE = 1;
	const COLUMN_SUFIX = null;
	const FEATURE_STRING_SECURITY = null;

	/**
	 * This constant is used to determinate if this model will use the "siteid" column.
	 * FALSE : It means the table DON'T uses or has the "siteid_xxx" column and its data is shared.
	 * TRUE : It means the table HAS and USES the "siteid_xxx" column and its data is specific by site.
	 */
	const HAS_SITE_COLUMN = false;

	public function __construct ()
	{

	}

	/**
	 * __get magic
	 *
	 * Allows models to access CI's loaded classes using the same
	 * syntax as controllers.
	 *
	 * @param    string $key
	 */
	public function __get ( $key )
	{
		// Debugging note:
		//	If you're here because you're getting an error message
		//	saying 'Undefined Property: system/core/Model.php', it's
		//	most likely a typo in your model code.
		return get_instance()->$key;
	}

	public function getId ()
	{
		static::validateTableDefinition();
		$idName = static::ID_FIELD;
		return $this->$idName;
	}

	/**
	 * @return self
	 */
	public static function getById ( $id )
	{
		static::validateTableDefinition();
		$ci = &get_instance();
		$ci->load->database();
		$sql = 'select * from ' . static::TABLE_NAME . ' where ' . static::ID_FIELD . ' = ' . $ci->db->escape( $id ) . ' and ' . static::DELETE_FIELD . " != 1";

		$query = $ci->db->query( $sql );
		return $query->row( 0, get_called_class() );
	}

	public function save ()
	{
		static::validateTableDefinition();
		$loggedUserId = Model_User::getLoggedUserId();

		if ( ! isset( $loggedUserId ) )
		{
			$loggedUserId = 0;
		}

		$now = new DateTime();
		if ( $this->getId() !== null && $this->getId() !== "" )
		{
			if ( static::HAS_SITE_COLUMN )
			{
				$siteId = "siteid" . static::COLUMN_SUFIX;
				$this->$siteId = static::getSessionSiteID();
			}
			$editedBy = "editedby" . static::COLUMN_SUFIX;
			$editedOn = "editedon" . static::COLUMN_SUFIX;
			$this->$editedBy = $loggedUserId;
			$this->$editedOn = $now->format( "Y-m-d H:i:s" );
			return $this->db->update(
										static::TABLE_NAME,
										get_object_vars( $this ),
										array( static::ID_FIELD => $this->getId() )
									);
		}
		else
		{
			$createdBy = "createdby" . static::COLUMN_SUFIX;
			$createdOn = "createdon" . static::COLUMN_SUFIX;
			$this->$createdBy = $loggedUserId;
			$this->$createdOn = $now->format( "Y-m-d H:i:s" );
			$dataToSave = get_object_vars( $this );

			if ( static::HAS_SITE_COLUMN )
			{
				$dataToSave[ 'siteid' . static::COLUMN_SUFIX ] = static::getSessionSiteID();
			}
			$result = $this->db->insert(
				static::TABLE_NAME,
				$dataToSave
			);
			$idField = static::ID_FIELD;

			if ( $result === true )
			{
				$this->$idField = $this->db->insert_id();
			}

			return $this->$idField;
		}
	}

	public function delete ()
	{
		static::validateTableDefinition();
		$idField = static::ID_FIELD;
		$loggedUserId = Model_User::getLoggedUserId();
		$now = new DateTime();
		if ( static::hasLogicalDeletion() )
		{
			// Delete logically the row. Change the state.

			$editedBy = "editedby" . static::COLUMN_SUFIX;
			$editedOn = "editedon" . static::COLUMN_SUFIX;
			$this->$editedBy = $loggedUserId;
			$this->$editedOn = $now->format( "Y-m-d H:i:s" );
			$fields=array( static::DELETE_FIELD => static::DELETE_STATE,
							$editedBy=>$this->$editedBy,
							$editedOn=>$this->$editedOn);
			$result = $this->db->update( static::TABLE_NAME, $fields, array( static::ID_FIELD => $this->getId() ) );
			$this->$idField = null;
			return $result;
		}
		else
		{
			//Delete fisically the row.
			$result = $this->db->delete( static::TABLE_NAME, array( static::ID_FIELD => $this->getId() ) );
			$this->$idField = null;
			return $result;
		}
	}

	/**
	 * Return the list of errors.
	 *
	 * @return array List of errors.
	 */
	public function errorsDB ()
	{
		return $this->db->error();
	}

	protected static function validateTableDefinition ()
	{
		if ( static::TABLE_NAME === null )
		{
			throw new Exception( 'Model Exception: TABLE_NAME definition is not set' );
		}

		if ( static::ID_FIELD === null )
		{
			throw new Exception( 'Model Exception: ID_FIELD definition is not set' );
		}
	}

	public static function getDeleteConditionSql ()
	{
		$delCondition = ' 0 = 0 ';
		if ( static::hasLogicalDeletion() )
		{
			if ( is_string( static::DELETE_STATE ) )
			{
				$delCondition = ' ' . static::TABLE_NAME . '.' . static::DELETE_FIELD . ' != \'' . static::DELETE_STATE . '\' ';
			}
			else
			{
				$delCondition = ' ' . static::TABLE_NAME . '.' . static::DELETE_FIELD . ' != ' . static::DELETE_STATE . ' ';
			}
		}

		return $delCondition;
	}

	protected static function hasLogicalDeletion ()
	{
		if ( static::DELETE_FIELD !== null && static::DELETE_STATE !== null )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	public function toArray ()
	{
		return get_object_vars( $this );
	}

	public static function getDataTable ( $table,$searchValue = "", $limit = 10, $offset = 0, $sortBy = "", $sortDir = "asc" )
	{
		if ( empty( $sortBy ) )
		{
			$sortBy = 'id';
		}
		if ( $sortBy === null )
		{
			$sortBy =  'id';
		}

		$columnsToSearch =array_diff( Schema::getColumnListing($table) , array('id','created_at','updated_at','deleted_at'));

		$sql = 'select '.$table.'.*  from ' . $table;
		$sql .= ' where 0=0 ';

		if ( !empty( $searchValue ) )
		{
			$sql .= ' and (';
			foreach ( $columnsToSearch as $column )
			{
				$sql .= ' ' . $column . ' like ' .  "'%" . $searchValue . "%'". ' or ';
			}
			$sql = substr( $sql, 0, -3 );
			$sql .= ")";
		}
		$sql .= ' and '.$table.'.deleted_at IS NULL order by ' . $sortBy  . ' ' . $sortDir  . ' limit ' . $limit  . ' offset ' .  $offset ;
		$query = DB::select($sql);
		return $query;
	}

	public static function countDataTable ($table, $searchValue = "" )
	{
		$fieldColumn =array_diff( Schema::getColumnListing($table) , array('id','created_at','updated_at','deleted_at'));
		$sql = 'select count( id ) as total from ' . $table;
		$sql .= ' where 0=0 ';

		if ( !empty( $searchValue ) )
		{
			$sql .= " and (";
			foreach ( $fieldColumn as $column )
			{
				$sql .= ' ' . $column . ' like ' . "'%" . $searchValue . "%'"  . ' or ';
			}

			$sql = substr( $sql, 0, -3 );
			$sql .= ")";
		}
		$sql .= ' and deleted_at IS NULL ';
		$query = DB::select( $sql );
		return $query[0]->total;
	}

	/**
	 * @return self[]
	 */
	public static function getAll ( $limit = 10, $offset = 0 )
	{
		static::validateTableDefinition();
		$ci = &get_instance();
		$ci->load->database();

		$sql = 'select * from '
			. static::TABLE_NAME
			. ' where '
			. static::getDeleteConditionSql()
			. ( ( static::HAS_SITE_COLUMN ) ? ' AND siteid' . static::COLUMN_SUFIX . ' = ' . static::getSessionSiteID() : null )
			. ' limit ' . $limit . ' offset ' . $offset;
		$query = $ci->db->query( $sql );
		return $query->result( get_called_class() );
	}

	public static function countAll ()
	{
		static::validateTableDefinition();
		$ci = &get_instance();
		$ci->load->database();

		$sql = 'select count(' . static::ID_FIELD . ') as total from '
			. static::TABLE_NAME
			. ' where '
			. static::getDeleteConditionSql()
			. ( ( static::HAS_SITE_COLUMN ) ? ' AND siteid' . static::COLUMN_SUFIX . ' = ' . static::getSessionSiteID() : null );

		$query = $ci->db->query( $sql );
		return $query->row()->total;
	}


	/**
	 * @return self[]
	 */
	public static function getAllByIds ( $idsArray )
	{
		$result = array();
		if ( count( $idsArray ) > 0 )
		{
			static::validateTableDefinition();
			$ci = &get_instance();
			$ci->load->database();
			$sql = 'select * from ' . static::TABLE_NAME . ' where ' . static::ID_FIELD . ' in (';

			foreach ( $idsArray as $id )
			{
				$sql .= $ci->db->escape( $id );
				if ( $id !== end( $idsArray ) )
				{
					$sql .= ", ";
				}
			}

			$sql .= ") and " . static::getDeleteConditionSql()
				. ( static::HAS_SITE_COLUMN ? ' AND siteid' . static::COLUMN_SUFIX . ' = ' . $ci->db->escape( static::getSessionSiteID() ) : null );

			$query = $ci->db->query( $sql );
			$result = $query->result( get_called_class() );;
		}
		return $result;
	}

	/**
	 * @return int the next id for the Model
	 */
	public static function getNextId ()
	{
		static::validateTableDefinition();
		$ci = &get_instance();
		$ci->load->database();

		$sql = 'select max(' . static::ID_FIELD . ') +1 as nextid from ' . static::TABLE_NAME;

		$query = $ci->db->query( $sql );
		return $query->row()->nextid;
	}


	/**
	 * Filters the field desired for output.
	 *
	 * @param $resultQuery array Get from query db
	 * @param $fieldsFilter array
	 *
	 * @return array Result filtered for JSON export.
	 */
	public static function filterOutputFromQueryResult ( $resultQuery, $fieldsFilter )
	{
		$finalResult = [ ];

		foreach ( $resultQuery as $resultItem )
		{
			if (!is_array( $resultItem )) {
				$resultItem = $resultItem->toArray();
			}

			$filterResultItem = [ ];
			$fields = array_keys( $fieldsFilter );

			foreach ( $fields as $key )
			{

				$labelToSet = $fieldsFilter[ $key ];

				if ( array_key_exists( $key, $resultItem ) )
				{
					$filterResultItem[ $labelToSet ] = $resultItem [ $key ];
				}
			}

			$finalResult[] = $filterResultItem;

		}

		return $finalResult;
	}

	/**
	 * Filters the field desired for output.
	 *
	 * @param $object array Get from Object parsed by toArray() method.
	 * @param $fieldsFilter array Fields to show with own label outputs.
	 *
	 * @return array Result filtered for JSON export.
	 */
	public static function filterOutputFromObject ( $object, $fieldsFilter )
	{

		$filterResultItem = [ ];
		$fields = array_keys( $fieldsFilter );

		foreach ( $fields as $key )
		{

			$labelToSet = $fieldsFilter[ $key ];

			if ( array_key_exists( $key, $object ) )
			{
				$filterResultItem[ $labelToSet ] = $object [ $key ];
			}
		}

		return $filterResultItem;
	}

	/**
	 * Validade unique field in the table.
	 *
	 * @param $arrField array Field and its value to validate.
	 *
	 * @return boolean .
	 */
	public function validateUniqueField ( $arrField )
	{
		static::validateTableDefinition();
		$ci = &get_instance();
		$ci->load->database();
		if ( $this->getId() !== null && $this->getId() !== "" )
		{
			$sql = 'select count(' . static::ID_FIELD . ') as exist
					from ' . static::TABLE_NAME .
					' where ' . static::getDeleteConditionSql() . ' and '.
				$arrField[ 0 ] . '=' . $ci->db->escape( $arrField[ 1 ] ) . ' and ' . static::ID_FIELD . '!=' . $this->getId()
				. ( static::HAS_SITE_COLUMN ? ' AND siteid' . static::COLUMN_SUFIX . ' = ' . $this->db->escape( static::getSessionSiteID() ) : null );

			$query = $ci->db->query( $sql );

			if ( $query->row()->exist > 0 )
			{
				return TRUE;
			}
			else
			{
				return FALSE;
			}
		}
		else
		{
			$sql = 'select count(' . static::ID_FIELD . ') as exist
					from ' . static::TABLE_NAME .
					' where ' . static::getDeleteConditionSql() . ' and '.
					$arrField[0]. '=' . $ci->db->escape( $arrField[1] )
				. ( static::HAS_SITE_COLUMN ? ' AND siteid' . static::COLUMN_SUFIX . ' = ' . $this->db->escape( static::getSessionSiteID() ) : null );

			$query = $ci->db->query( $sql );

			if ( $query->row()->exist > 0 )
			{
				return TRUE;
			}
			else
			{
				return FALSE;
			}
		}
	}
	/**
	 * @param ajax_parameter, array that has values to insert in model
	 * @param mask, mask that transform the ajax_parameter $keys to the property name
	 * */
	public function loadModel( array $ajax_parameter, array $mask=array() )
	{
		if( !$mask )
		{
			foreach ( $ajax_parameter as $param => $value )
			{
				if( property_exists( $this, $param ) )
					$this->$param = $value;
			}
		}else
		{
			foreach ( $mask as $key => $value )
			{
				if( property_exists( $this, $value ) )
					$this->$value = $ajax_parameter[ $key ];
			}
		}
	}

	/**
	 * Use this method to start a transaction on DataBase.
	 * This transaction works on all and all models.
	 *
	 * @param bool $test Set the value TRUE to enabled test mode and it will automatically rollback the queries.
	 * @return bool
	 */
	public static function startTransaction ( $test = false )
	{
		$codeIgniterInstance = &get_instance();
		$codeIgniterInstance->load->database();

		return $codeIgniterInstance->db->trans_begin( $test );
	}

	/**
	 * Use this method to end a started transaction.
	 *
	 * @return bool
	 */
	public static function completeTransaction ()
	{
		$codeIgniterInstance = &get_instance();
		$codeIgniterInstance->load->database();

		return $codeIgniterInstance->db->trans_complete();
	}

	/**
	 * Use this method to know the status of the last transaction completed.
	 *
	 * @return bool TRUE if it was commited, FALSE if it was rolledback.
	 */
	public static function statusTransaction ()
	{
		$codeIgniterInstance = &get_instance();
		$codeIgniterInstance->load->database();

		return $codeIgniterInstance->db->trans_status();
	}

	/**
	 * Return the list of errors.
	 *
	 * @return array List of errors.
	 */
	public static function errorsTransaction ()
	{
		$codeIgniterInstance = &get_instance();
		$codeIgniterInstance->load->database();

		return $codeIgniterInstance->db->error();
	}

	/**
	 * This method gets the current site ID from the session.
	 * @return integer
	 */
	public static function getSessionSiteID ()
	{
		/** @var MY_Controller $ci */
		$ci = &get_instance();
		if ( is_cli() )
		{
			$siteID = $ci->config->item( 'default_site_id' );
		}
		else
		{
			$ci->load->library( 'session' );

			$siteID = $ci->session->userdata( 'currentSite' );

			if ( $siteID == null )
			{
				$siteID = $ci->config->item( 'default_site_id' );
			}
		}

		return $siteID;
	}

	/**
	 * This function helps in operations to find records by specific criteria.
	 * @param string|array $field As string the column name on table. It can be an array with key/value, the key is the name of column.
	 * @param string|integer|float $value
	 * @param string|array $selectFields Documented on DB_Query_builder class, select() method.
	 *
	 * @return self[]
	 */
	public static function getBy ( $field, $value = null, $selectFields = null )
	{
		$codeigniter =& get_instance();

		if (static::DELETE_FIELD !== null) {
			$whereClause = [
				static::DELETE_FIELD => false,
			];
		} else {
			$whereClause = [];
		}

		if ( $selectFields === null )
		{
			$selectFields = '*';
		}

		if ( is_array( $field ) )
		{
			$whereClause = array_merge( $whereClause, $field );
		}
		else
		{
			$whereClause[ $field ] = $value;
		}

		$codeigniter->load->database();

		return $codeigniter->db
			->select( $selectFields )
			->from( static::TABLE_NAME )
			->where( $whereClause )
			->get()
			->result( get_called_class() );
	}

	/**
	 * Determines if the model reached its limit of use.
	 *
	 * If you use this method when the system has not restricted use, will return always FALSE.
	 */
	public static function limitReached ()
	{
		$codeigniter =& get_instance();
		if ( $codeigniter->config->item( 'restricted_use' ) )
		{
			/** @var CI_DB_mysqli_driver $database */
			$codeigniter->load->database();
			$database = $codeigniter->db;

				/* - Check quote of use ---------------------------------------------- */
			/** @var CI_DB_mysqli_result $result */
			$result = $database
				->select( 'quote_cde' )
				->from( 'sys_contract_detail' )
				->where(
					[
						'featurestringscurity_cde' => static::FEATURE_STRING_SECURITY,
					]
				)
				->get();

			if ( $result->num_rows() > 0 )
			{
				return $result->result()[0]->quote_cde > static::countAll();
			}
			else
			{
				return false;
			}
			/* ------------------------------------------------------------------- */
		}
		else
		{
			return false;
		}
	}
}
