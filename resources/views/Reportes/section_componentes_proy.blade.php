<table width="100%">
    <thead>

    </thead>
    <tbody>
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
         <tr>
            <td  rowspan="3">jaldf</td>
            <td  rowspan="3">adfa</td>
            <td  rowspan="3">asdfad</td>

         </tr>
        <tr>
            <td>300</td>
            <td>400</td>
        </tr>
        <tr>
            <td>300</td>
            <td>400</td>
        </tr>
        <tr>
            <td  rowspan="3">adsf</td>
            <td  rowspan="3">adf234a</td>
            <td  rowspan="3">as345345dfad</td>

         </tr>
        <tr>
            <td>300</td>
            <td>400</td>
        </tr>
        <tr>
            <td>300</td>
            <td>400</td>
        </tr>
        @foreach( $componentes as $value )
         <tr>
            <td rowspan="{{ count($value->hitos) }}">{{$value->cmpNombre}}</td>
            <td rowspan="{{ count($value->hitos) }}">{{$value->cmpTipoEjecucion == "administracionPropia" ? "Administracion Propia" : "Contratacion a Terceros"}}</td>
            <td rowspan="{{ count($value->hitos) }}">{{$value->cmpMonto}}</td>
         </tr>

    </tbody>

</table>
