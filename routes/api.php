<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
  'prefix' => 'v1'//auth
], function () {
  
  Route::post('/auth/login', [App\Http\Controllers\AuthController::class, 'login']);
  Route::post('/auth/register', [App\Http\Controllers\UserController::class, 'register']);
  Route::get('/auth/post', [App\Http\Controllers\PostController::class, 'index']);
  
  
});

Route::group([
  'middleware' => ['jwt.auth'],//api
  'prefix' => 'v1'//auth
], function () {
  
  /**** AUTH - LOGIN ****/
  Route::post('/auth/refresh', [App\Http\Controllers\AuthController::class, 'refresh']);
  Route::post('/auth/logout', [App\Http\Controllers\AuthController::class, 'logout']);
  Route::get('/auth/user', [App\Http\Controllers\AuthController::class, 'user']);

  /**** USERS ****/
  Route::get('/auth/users', [App\Http\Controllers\UserController::class, 'getUsers']);
  
  /**** AUTH - POST ****/
  Route::post('/auth/post', [App\Http\Controllers\PostController::class, 'store']);
  Route::get('/auth/post/{id}', [App\Http\Controllers\PostController::class, 'show']);
  Route::put('/auth/post/{id}', [App\Http\Controllers\PostController::class, 'update']);
  Route::delete('/auth/post/{id}', [App\Http\Controllers\PostController::class, 'destroy']);
  
  
});