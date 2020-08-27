<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGactActivos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    private $sufix ='act_';
    private $sufix_per ='per_';
    private $sufix_gestion ='gest_';
    public function up()
    {
        Schema::create('conf_gestion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string($this->sufix_gestion.'nombre', 50);
            $table->string($this->sufix_gestion.'detalle',250)->nullable();
            $table->enum($this->sufix_gestion.'estado', ['Activo' , 'Inactivo', 'Anulado'] )->nullable();
            $table->date($this->sufix_gestion.'fecha_inicio')->nullable();
            $table->date($this->sufix_gestion.'fecha_fin')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('rrhh_persona', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('per_nombre', 50);
            $table->string($this->sufix_per.'apellido_pat',50)->nullable();
            $table->string($this->sufix_per.'apellido_mat',50)->nullable();
            $table->date($this->sufix_per.'fecha_nacimiento')->nullable();
            $table->string($this->sufix_per.'genero',50)->nullable();
            $table->enum($this->sufix_per.'tipo_documento_identidad',['CI','PASAPORTE'])->nullable();
            $table->string($this->sufix_per.'numero_identidad',50)->nullable();
            $table->string($this->sufix_per.'foto',150)->nullable();
            
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('gact_activos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger($this->sufix.'macroproceso_id')->nullable();
            $table->unsignedBigInteger( $this->sufix.'zona_id' )->nullable();
            $table->unsignedBigInteger( $this->sufix.'gestion_id' )->nullable();
            $table->unsignedBigInteger( $this->sufix.'propietario_id' )->nullable();
            $table->unsignedBigInteger( $this->sufix.'ubicacion_id' )->nullable();
            $table->unsignedBigInteger($this->sufix.'clasificacion_id' )->nullable();
            $table->unsignedBigInteger($this->sufix.'tipo_activo_id' )->nullable();

            $table->string($this->sufix.'id_aleatorio',50);
            $table->string($this->sufix.'nombre_activo',50)->nullable();
            $table->string($this->sufix.'descripcion',300)->nullable();
            // $table->string($this->sufix.'ubicacion', 50 )->nullable();
            $table->enum($this->sufix.'control_acceso', ['1' , '2', '3', '4', '5'] )->nullable();
            // $table->enum($this->sufix.'tipo_activo', ['1' , '2', '3', '4', '5', '6', 7, 8,9] )->nullable();
            $table->enum($this->sufix.'estado', ['Vigente' , 'Nuevo', 'Revision'] )->nullable();
            $table->foreign( $this->sufix.'propietario_id' )->references( 'id' )->on('rrhh_persona');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gact_activos');
        Schema::dropIfExists('conf_gestion');
        Schema::dropIfExists('rrhh_persona');
    }
}
