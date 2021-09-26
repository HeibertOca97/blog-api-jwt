<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
  
  public function register(Request $req){
    $credentials = $req->only("email", "password");
    
    $validator = Validator::make($credentials, [
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:8'
    ]);
    
    if ($validator->fails()) {
      Log::info("La variable: " . $validator->errors()." no cumple con la regla de validacion"); //Log info
      return response()->json([
        'success' => false,
        'message' => "Wrong validation",
        'errors' => $validator->errors(),//devuelve los errores
      ], 422);
    }

    try {
      User::create([
        'email' => $credentials['email'],
        'password' => bcrypt($credentials['password'])
      ]);

      return response()->json([
        'success' => true,
        'message' => "User created"
      ], 200);  
    } catch (\Throwable $th) {
      return response()->json([
        'success' => false,
        'message' => "Problem creating user"
      ], 401);  
    }
    
  }

  public function getUsers(){
    $users = User::orderBy('id', 'ASC')->where('id', "!=", JWTAuth::user()->id)->get();
    $users->map(function($user){
          return [
              "id" => $user->id,
              "username" => $user->username,
              "email" => $user->email,
              "created_at" => $user->created_at, 
              "updated_at" => $user->updated_at,
              "posts" => $user->posts->count()
            ];
      });
      
    return response()->json([
        'users' => $users
      ], 200); 
  }
  

}
