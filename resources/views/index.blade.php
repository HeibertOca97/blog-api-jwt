<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf_token"  content="{{ csrf_token() }}">
  <title></title>
  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body> 
  
  <div id="root"></div>
  <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>

</body>
</html>

