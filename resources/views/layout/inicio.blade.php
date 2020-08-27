<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{ config('app.name') }}</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Ionicons -->
  <link rel="stylesheet"  href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
   <!-- Bootstrap 4 -->
   <!-- <link rel="stylesheet"  href="{{asset('plugins/bootstrap-4.4.1/css/bootstrap.css')}}" > -->
  <!-- Tempusdominus Bbootstrap 4 -->
  <link rel="stylesheet"  href="{{asset('plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}" >
  <!-- iCheck -->
  <link rel="stylesheet" href="{{asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
  <!-- JQVMap -->
  <link rel="stylesheet" href="{{asset('plugins/jqvmap/jqvmap.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('plugins/admLte/css/adminlte.min.css')}}">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="{{asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="{{asset('plugins/daterangepicker/daterangepicker.css')}}">
  <!-- summernote -->
  <link rel="stylesheet" href="{{asset('plugins/summernote/summernote-bs4.css')}}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <!-- ESTILOS DEL DATATABLE -->
  <link rel="stylesheet" href="{{asset('plugins/datatables/datatables.min.css')}}">
  <!-- datatables-bs4 -->
  <!-- <link rel="stylesheet" href="{{asset('plugins/datatables-bs4/css/dataTables.bootstrap4.css')}}"> -->
  <!-- datatables-responsive -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-responsive/css/responsive.bootstrap4.css')}}">
  <!-- datatables-buttons -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-buttons/css/buttons.bootstrap4.css')}}">
  <!-- datatables-autofill -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-autofill/css/autoFill.bootstrap4.css')}}">
  <!-- datatables-fixedcolumns -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-fixedcolumns/css/fixedColumns.bootstrap4.css')}}">
  <!-- datatables-fixedHeader -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-fixedheader/css/fixedHeader.bootstrap4.css')}}">
  <!-- datatables-colReorder -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-colreorder/css/colReorder.bootstrap4.css')}}">
  <!-- datatables-keytable -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-keytable/css/keyTable.bootstrap4.css')}}">
  <!-- datatables-rowgroup -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-rowgroup/css/rowGroup.bootstrap4.css')}}">
  <!-- datatables-rowreorder -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-rowreorder/css/rowReorder.bootstrap4.css')}}">
  <!-- datatables-scroller -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-scroller/css/scroller.bootstrap4.css')}}">
  <!-- datatables-select -->
  <link rel="stylesheet" href="{{asset('plugins/datatables-select/css/select.bootstrap4.css')}}">
  
  
  <!-- alertify -->
  <link rel="stylesheet" href="{{asset('plugins/alertify/alertify.css')}}">
</head>
<?php
$modulo = Session::get('modulo');
$objeto = Session::get('objeto');
$menuSinModulo = Session::get('menuSinModulo');
if ( !$modulo )
{
Redirect::to('login')->send();
}
?>
<script>
  var path_url_base='{{ config('app.url') }}';
  var csrf_token = '{{ csrf_token() }}';
</script>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-info navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a style="color:white" class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <div style="text-align : center;width: 66%;     margin: 0 auto;">
            <h2 style="color:white ; font-weight: bold;" >{{ Session::get('nombreInstitucion') }}</h2>
        </div>
    </ul>
    <ul class="navbar-nav ml-auto" style="color:white" >
        <li style="    text-align: right;"><img style="    width: 52%;" src="{{asset('images/user.png')}}" alt=""></li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav " style="color:white; " >
        <li class="dropdown">
            <a style="color: white ; height: max-content;"  href="#" class="nav-link" data-toggle="dropdown">
                <span style="font-weight: bold;">{{auth()->user()->name." ". auth()->user()->paterno. " ". auth()->user()->materno}}</span>
                <br>
                <span style="font-weight: bold;">Cargo</span>
                <br>
                <span style="font-weight: bold;">{{Date('d/m/Y')}}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: block;">
                                            @csrf
                        <a class="btn btn-white" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                           <img style="width: 43%;" src="{{asset('images/logout.png')}}" class="user-image" alt="User Image">
                        </a>
                </form>
                <!-- <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a> -->
            </div>
        </li>
      <!-- Messages Dropdown Menu -->

      <!-- Notifications Dropdown Menu -->
      <!-- <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li> -->

    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="{{asset('dist/img/AdminLTELogo.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">{{ config('app.name') }}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <!-- <div class="image">
          <img src="{{asset('dist/img/user2-160x160.jpg')}}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div> -->
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2" id="">
        <ul class='nav nav-pills nav-sidebar flex-column'  data-widget='treeview' role='menu' data-accordion='false'>
            @if( $modulo )
            @foreach( $modulo as $mod )
            <li class="nav-item has-treeview " id="itemMenuOpen{{ $mod->nombre }}">
            <a href="#" class="nav-link " id="itemMenuParent{{$mod->nombre}}" data-modulo="">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    {{ $mod->nombre }}
                    <i class="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul class="nav nav-treeview">
                @foreach ( $objeto as $obj )
                    @if( $mod->id == $obj->idModulo && $obj->puedeListar != 0 && $obj->visibleEnMenu=='SI')
                        <li class="nav-item" >
                            <a href=" {!!URL::to($obj->urlObjeto)!!} " class="nav-link" id="itemMenuChildren{{ $obj->urlObjeto }}" data-item_parent="{{$mod->nombre}}">
                                <i class="far fa-circle nav-icon"></i>
                                <p>{{ $obj->nombre }}</p>
                            </a>
                        </li>
                    @endif
                @endforeach
            </ul>
            </li>
            @endforeach
            @endif
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <!-- <div class="row mb-2"> -->
          <!-- <div class="col-sm-6"> -->
            <!-- <h1 class="m-0 text-dark">Dashboard</h1> -->
          <!-- </div> -->
          <!-- /.col -->
          <!-- <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard v1</li>
            </ol> -->
          <!-- </div> -->
          <!-- /.col -->
        <!-- </div> -->
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    @yield('contentPersonate')
    <section class="content" id="contentBody">
     
        @yield('content')
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2014-20190 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.0.2-pre
      
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="{{asset('plugins/jquery/jquery.min.js')}}"></script>
<!-- jQuery UI 1.11.4 -->
<script src="{{asset('plugins/jquery-ui/jquery-ui.min.js')}}"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="{{asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- ChartJS -->
<script src="{{asset('plugins/chart.js/Chart.min.js')}}"></script>
<!-- Sparkline -->
<script src="{{asset('plugins/sparklines/sparkline.js')}}"></script>
<!-- JQVMap -->
<script src="{{asset('plugins/jqvmap/jquery.vmap.min.js')}}"></script>
<!-- <script src="{{asset('plugins/jqvmap/maps/jquery.vmap.usa.js')}}')}}"></script> -->
<!-- jQuery Knob Chart -->
<script src="{{asset('plugins/jquery-knob/jquery.knob.min.js')}}"></script>
<!-- daterangepicker -->
<script src="{{asset('plugins/moment/moment.min.js')}}"></script>
<script src="{{asset('plugins/daterangepicker/daterangepicker.js')}}"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="{{asset('plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
<!-- Summernote -->
<script src="{{asset('plugins/summernote/summernote-bs4.min.js')}}"></script>
<!-- overlayScrollbars -->
<script src="{{asset('plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{asset('plugins/admLte/js/adminlte.js')}}"></script>



<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="{{asset('dist/js/pages/dashboard.js')}}"></script> -->
<!-- AdminLTE for demo purposes -->
<!-- <script src="{{asset('dist/js/demo.js')}}"></script> -->
<script src="{{asset('js/app.js')}}"></script>
<!-- <script src="{{asset('js/plugins/alertss.js')}}"></script> -->
<script type="text/javascript">
            var urlForm='{{$urlForm }}';
            $(document).ready(function()
            {
               var elementChilder = $('#itemMenuChildren{{$urlForm ?? ''}}');
               var elementParent = elementChilder.data('item_parent');
               console.log(elementParent);
               elementChilder.addClass('active');
               $( '#itemMenuOpen'+elementParent ).addClass('menu-open');
               $( '#itemMenuParent'+elementParent ).addClass('active');

            })
 </script>
@yield('Jscripts')
<!-- datatables -->
<script src="{{asset('plugins/datatables/jquery.dataTables.js')}}"></script>
<!-- <script src="{{asset('plugins/datatables/datatables.min.js')}}"></script> -->
  <!-- datatables-bs4 -->
  <script src="{{asset('plugins/bootstrap-4.4.1/js/bootstrap.js')}}"></script>
  <script src="{{asset('plugins/bootstrap-4.4.1/js/bootstrap.bundle.min.js')}}"></script>
<!-- datatables-responsive -->
<script src="{{asset('plugins/datatables-responsive/js/dataTables.responsive.js')}}"></script>
<!-- datatables-responsive -->
<script src="{{asset('plugins/datatables-responsive/js/responsive.bootstrap4.js')}}"></script>
</body>
</html>
