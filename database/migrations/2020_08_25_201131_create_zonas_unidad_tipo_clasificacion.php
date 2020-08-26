<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateZonasUnidadTipoClasificacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gact_zonas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('zona_nombre',50);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('gact_unidad', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('unidad_nombre',50);
            $table->string('unidad_descripcion',250);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('gact_tipo_activo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('tipo_nombre',50);
            $table->string('tipo_descripcion',250);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('gact_clasificacion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('clasif_nombre',50);
            $table->string('clasifi_descripcion',150);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gact_zonas');
        Schema::dropIfExists('gact_unidad');
        Schema::dropIfExists('gact_tipo_activo');
        Schema::dropIfExists('gact_clasificacion');
    }
}
