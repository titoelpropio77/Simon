<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Amenazasvulneraviblidades extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gact_amenazas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('ame_nombre',30);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('gact_vulnerabilidades', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('vul_nombre',30);
            $table->unsignedBigInteger('ame_id');
            $table->foreign('ame_id')->references('id')->on('gact_amenazas');
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
        Schema::dropIfExists('gact_amenazas');
        Schema::dropIfExists('gact_vulnerabilidades');
    }
}
