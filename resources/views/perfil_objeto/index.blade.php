@extends( 'layout.inicio' )
@section('contentPersonate')
    <input  name="perfil_id" id="perfil_id" type="hidden" value='{{$idPerfil}}'  />
@endsection
@section('content')

@endsection
@section('Jscripts')
<script src="{{asset('js/perfil_objeto.js')}}"></script>

@endsection
