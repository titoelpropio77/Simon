<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','perfil_id', 'paterno', 'materno', 'fecha_activacion', 'fecha_desactivacion', 'motivo_desactivacion','lic_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'perfil_id');
    }
    public function licencia()
    {
        return $this->belongsTo('\App\Licencia'::class, 'lic_id');
    }
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
