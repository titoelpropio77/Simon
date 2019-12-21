@extends( 'layout.inicio' )
@section('content')

@endsection
@section('Jscripts')
<input type="hidden" value={{$proyectoId}} id="proyecto_id">
<script src="{{asset('js/proyecto.create.js')}}"></script>
<!-- <link rel="stylesheet"  href="{{asset('plugins/date-picker/date-picker.css')}}" > -->
@endsection
