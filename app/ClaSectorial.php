<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClaSectorial extends Model
{
    protected $table = 'aux_clasectorial';

    public static function getSectorAndSubSectorAndTipo( $idSector )
    {
        $result = self::findOrFail( $idSector );
        if (  $result )
        {
            $sector = self::where([
                [ 'Sector', '=' , $result->Sector  ],
                [ 'subSector', '=' ,0  ],
                [ 'tipo', '=' ,0  ]
                ])->first();
            $subSector = self::where([
                [ 'Sector', '=' , $result->Sector  ],
                [ 'subSector', '=' ,$result->subSector ],
                [ 'tipo', '=' ,0  ]
                ])->first();
            $resul= [ 'Sector' => $sector, 'subSector' => $subSector , 'tipo'  => $result ];
        }
        return $resul;
    }
}
