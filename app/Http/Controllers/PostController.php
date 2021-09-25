<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return response()->json(Post::orderBy('id', 'DESC')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      
      $data = $request->only("title", "description", "image");
      
      $validator = Validator::make($data, [
        "title" => "required|max:80",
        "description" => "required|max:255",
        "image" => "mimes:jpeg,jpg,png|required|max:3072"
      ]);
      
      if($validator->fails()){
        return response()->json([
          'success' => false,
          'message' => "Error de validacion",
          'errors' => $validator->errors()
        ], 422);
      }
      
      $url = $request->file("image")->store("public/avatars");
      $url_img = Str::replaceFirst("public", "storage", $url);
      $data["image"] = $url_img;
      $data["user_id"] = Auth::user()->id;
      
      try {
        Post::create($data);
        
        return response()->json([
            "success" =>true,
            "message" =>"Nuevo post creado"
          ], 200);
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'message' => "Fallo al crear post"
        ], 401);
      }

    }

    public function show($id)
    {
      try {
        $post = Post::findOrFail($id);
        if ($post) {
          return response()->json([
            "success" =>true,
            "message" =>"Post encontrado!",
            "post" => $post
          ], 200);
        }
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'message' => "No se encontro ningun post con ese dato."
        ], 422);
      }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
      try {
        $post = Post::findOrFail($id);
        $post->title = $req->title;
        $post->description = $req->description;
        $post->save();
        
        return response()->json([
          "success" =>true,
          "message" =>"Post actualizado!"
        ], 200);
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'message' => "Fallo al actualizar el post"
        ], 422);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $post = Post::findOrFail($id);
        $post->delete();
        
        return response()->json([
          "success" =>true,
          "message" =>"Post eliminado con exito!"
        ], 200);
      } catch (\Throwable $th) {
        return response()->json([
        'success' => false,
        'message' => "Fallo al eliminar el post"
      ], 422);
      }
    }
}
