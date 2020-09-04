<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUsersIdToArea extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gact_areas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('area_nombre',50);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('idArea')->unsigned()->nullable()->after('materno');
            $table->foreign('idArea')->references('id')->on('gact_areas')->ondelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['idArea']);
            $table->dropColumn('idArea');
        });
    }
}
