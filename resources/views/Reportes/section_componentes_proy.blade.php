<table width="100%" border="1" cellspacing=0 cellpadding=2 >
    <thead>

    </thead>
    <tbody >
        <tr>
                <td>Componentes</td>
                <td>Modalidad de Ejecucion</td>
                <td ></td>
                <td colspan="2" style="text-align: center">Metas de Proyecto</td>
         </tr>
         <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Unidad</td>
            <td>Cantidad</td>
         </tr>
        @foreach( $componentes as $value )
         <tr>
            <td rowspan="{{ count($value->hitos) + 1 }}">{{$value->cmpNombre }}</td>
            <td rowspan="{{ count($value->hitos) + 1 }}">{{$value->cmpTipoEjecucion == "administracionPropia" ? "Administracion Propia" : "Contratacion a Terceros"}}</td>
            <td rowspan="{{ count($value->hitos) + 1 }}">{{$value->cmpMonto}}</td>
         </tr>
         @foreach( $value->hitos as $hito )
         <tr>
            <td >{{$hito->aux_indicadores->indNombre . "(" . $hito->aux_indicadores->indUnidad . ")" }}</td>
            <td >{{$hito->cantidad}}</td>
         </tr>
         @endforeach
        @endforeach
    </tbody>

</table>
