@extends( 'layout.inicio' )
@section('content')

@endsection
@section('Jscripts')
<input type="hidden" value={{$proyectoId}} id="proyecto_id">
<script src="{{asset('js/proyecto.create.js')}}"></script>
<style>
.react-datepicker__input-container {
width: inherit;
}

.react-datepicker-wrapper {
  width: 100%;
}
</style>
<!-- <link rel="stylesheet"  href="{{asset('plugins/date-picker/date-picker.css')}}" > -->
@endsection
