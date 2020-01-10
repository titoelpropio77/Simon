<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMessageStatusToProyecto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('proyecto', function (Blueprint $table) {
            $table->string( 'message_status' ,100)->nullable();
            $table->string( 'message_localizacion' ,100)->nullable();
            $table->string( 'message_cofinaciadores' ,100)->nullable();
            $table->string( 'message_componente' ,100)->nullable();
            $table->string( 'message_estructura_financiamiento' ,100)->nullable();
            $table->enum( 'status', ['Incompleto','Terminado', 'Pendiente', 'Anulado', 'En Proceso'] );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('proyecto', function (Blueprint $table) {
            $table->dropColumn( 'message_status' );
            $table->dropColumn( 'message_localizacion' );
            $table->dropColumn( 'message_cofinaciadores' );
            $table->dropColumn( 'message_componente' );
            $table->dropColumn( 'message_estructura_financiamiento' );
            $table->dropColumn( 'status' );
        });
    }
}
