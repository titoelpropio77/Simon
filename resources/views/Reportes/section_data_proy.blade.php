<table style="width: 100%;">
    <tr>
        <td class="labelField" style="width: 168px;">Nombre del Proyecto :</td>
        <td class="field" style="width: 300px">{{ $proyecto->pryNombre }}</td>
        <td colspan="2" class="labelField" style="text-align : center">
            CODIGO SIN SIN: {{ $proyecto->pryCodSisin }}
        </td>

    </tr>
    <tr >
        <td class="labelField" style="width: 180px;">Funcionario Responsable :</td>
        <td style="border-bottom-style: dotted; width: 300px"> {{ $proyecto->users ? $proyecto->users->name : 'nombre' }}</td>
        <td colspan="2" class="labelField" style="text-align : center">
            Cargo : <span class="field"> Ejecutivo Seccional</span>
        </td>

    </tr>
    <tr>
        <td class="labelField">
            Clasificacion Sectorial
        </td>
    </tr>
    <tr>
        <td rowspan="3" class="labelField" style="text-align: center">
            Codigo Sec. <br>
            {{ $sectorial['Sector']->Sector .'-'. $sectorial['subSector']->subSector .'-'. $sectorial['tipo']->tipo }}
        </td>
        <td class="labelField">
            Sector:
        </td>
        <td class="field labelField">
            {{ $sectorial['Sector']->denominacion}}
        </td>
    </tr>
    <tr>
        <td class="labelField">SubSector:</td>
        <td class="field labelField">{{$sectorial['subSector']->denominacion}}</td>
    </tr>
    <tr>
        <td class="labelField">Tipo de Proyecto:</td>
        <td class="field labelField">{{ $sectorial['tipo']->denominacion}}</td>
    </tr>
    <tr style="padding-top: 50px">
        <td style="padding-bottom: 8px;" colspan="4" class="labelField ">DESCRIPCION DEL PROYECTO</td>
    </tr>
    <tr>
        <td style="
            border: 1px solid;
            padding: 24px; font-size:9pt"

            colspan="4"
        >
        {{ $proyecto->pryDescripcion }}
        </td>
    </tr>

</table>
