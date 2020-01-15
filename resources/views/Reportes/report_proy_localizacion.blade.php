<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .labelField{
            font-size: 10pt;
        }
        .field {
            border-bottom-style: dotted;
        }
    </style>
</head>
<body style=" padding : 5px; font-family: sans-serif;">
    <div style="100%">
        @include('Reportes.section_head_proy')
    </div>
    <div style="    padding: 10px;">
      @include('Reportes.section_data_proy')
    </div>
    <div>
        <h4>Localizacion : </h4>
        @include('Reportes.section_localizacion_proy')
    </div>
    @include('Reportes.section_footer_proy')
</body>
</html>