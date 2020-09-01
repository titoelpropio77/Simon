@extends( 'layout.inicio' )
@section('contentPersonate')
<script>
    var amenaza_id = '{{$idAmenaza}}';
</script>
    {{-- <input  name="amenaza_id" id="amenaza_id" type="hidden" value='{{$idAmenaza}}' ref = "idAmenaza" /> --}}
@endsection
@section('content')

@endsection
@section('Jscripts')
<script src="{{asset('js/gact_vulnerabilidad.js')}}"></script>

@endsection
