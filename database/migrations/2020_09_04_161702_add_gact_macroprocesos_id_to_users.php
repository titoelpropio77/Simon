<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGactMacroprocesosIdToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('gact_macroprocesos', function (Blueprint $table) {
            $table->String('idUsuario')->nullable();
            $table->String('idCustodio')->nullable();
            $table->bigInteger('idPropietario')->unsigned()->nullable()->after('macpro_descripcion');
            $table->foreign('idPropietario')->references('id')->on('users')->ondelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('gact_macroprocesos', function (Blueprint $table) {
            $table->dropForeign(['idPropietario']);
            $table->dropColumn('idCustodio');
            $table->dropColumn('idUsuario');
        });
    }
}
