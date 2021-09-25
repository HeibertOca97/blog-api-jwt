<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenBlackListedException;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
  public function login(Request $req){
    $credentials = $req->only("email", "password");
    
    $validator = Validator::make($credentials, [
      'email' => 'required|email',
      'password' => 'required|min:8'
    ]);

    if ($validator->fails()) {
      return response()->json([
        'success' => false,
        'message' => "Wrong validation",
        'errors' => $validator->errors()
      ], 422); 
    }
    
    $token = JWTAuth::attempt($credentials);

    if($token){
      return response()->json([
        'success' => true,
        'token' => $token,
        'user' => JWTAuth::user()
      ], 200);
    }else{
      return response()->json([
        'success' => false,
        'message' => "Wrong credentials token"
      ], 401);
    }
  }
  
  public function refresh(){
    $token = JWTAuth::getToken();

    try {
      $token = JWTAuth::refresh($token);

      return response()->json([
        'success' => true,
        'token' => $token
      ], 200);
    } 
    catch (TokenExpiredException $e) {      
      return response()->json([
        'success' => false,
        'message' => "Need to login again please (Expired)!"
      ], 422);      
    }
    catch (TokenBlackListedException $ex) {      
      return response()->json([
        'success' => false,
        'message' => "Need to login again please (BlackListed)!"
      ], 422);      
    }

  }
  
  public function logout(){
    $token = JWTAuth::getToken();

    try {
      JWTAuth::invalidate($token);
      
      return response()->json([
        'success' => true,
        'message' => "Logout successfully"
      ], 200);
    } catch (JWTException $ex) {
      return response()->json([
        'success' => false,
        'message' => "Failed logout, please try again!"
      ], 422);    
    }
  }

  public function user(){
    $token = JWTAuth::getToken();
    try {
      if($token){
        return response()->json([
          "success" => true,
          "userAuth" => JWTAuth::user()
        ], 200);
      }
    } catch (\Throwable $th) {
      return response()->json([
        'success' => false,
        'message' => "No Authorization"
      ], 422);
    }
  }

}
