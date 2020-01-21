<style>
.localization p {
    text-align: center;
    width: 83%;
    margin: 0 auto;
    margin-bottom: 9px !important;
}
</style>
<table width="100%">
    <thead style="text-align: center; font-size : 11pt">
        <tr>
            <th>Departamento</th>
            <th>Provincia</th>
            <th>Municipio</th>
            <th>Comunidad o Distrito</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        @foreach( $proyectoLocalizacion as $value )
        <tr style="margin-bottom: 15px">
            <td class="localization">
                <p class="field">{{ $value['departamento'][0]->locNombre }}</p>
            </td>
            <td class="localization">
                <p class="field">{{ $value['provincia'][0]->locNombre }}</p>
            </td>
            <td class="localization">
                <p class="field">{{ $value['municipio'][0]->locNombre }}</p>
            </td>
            <td class="localization">
                <p class="field">{{ $value['comunidad'][0]->locNombre }}</p>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
