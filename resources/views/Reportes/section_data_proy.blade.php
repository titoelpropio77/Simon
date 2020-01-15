<table style="width: 100%;">
    <tr>
        <td class="labelField" style="width: 168px;">Nombre del Proyecto :</td>
        <td class="field" style="width: 300px">{{ $proyecto->pryNombre }}</td>
        <td class="labelField" style="text-align : right">
            CODIGO SIN SIN:
        </td>
        <td>
            {{ $proyecto->pryCodSisin }}
        </td>
    </tr>
    <tr >
        <td class="labelField" style="width: 180px;">Funcionario Responsable :</td>
        <td style="border-bottom-style: dotted; width: 300px"> {{ $proyecto->users ? $proyecto->users->name : 'nombre' }}</td>
        <td class="labelField" style="text-align : right">
            Cargo :
        </td>
        <td class="field">
            Ejecutivo Seccional
        </td>
    </tr>
    <tr>
        <td style="padding-bottom: 8px;" colspan="4" class="labelField">DESCRIPCION DEL PROYECTO</td>
    </tr>
    <tr>
        <td style="
            border: 1px solid;
            padding: 24px;"
            colspan="4"
        >
        {{ $proyecto->pryDescripcion }}
        </td>
    </tr>
</table>
