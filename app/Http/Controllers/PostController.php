<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $post = Post::where("user_id", "=", Auth::user()->id)->orderBy('id', 'DESC')->get();
        $post->map(function($item){
            return [
                "id" => $item->id,
                "title" => $item->title,
                "description" => $item->description,
                "image" => $item->image,
                "created_at" => $item->created_at,
                "updated_at" => $item->updated_at
            ];
        });
        return response()->json([
          "success" => true,
          "post" => $post
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return response()->json([
        //     "success" =>true,
        //     "message" =>"Nuevo post creado",
        //     "post" => $request->all()
        //   ], 200);

        //   return;
      
      $data = $request->only("title", "description", "image");
      
      $validator = Validator::make($data, [
        "title" => "required|max:80",
        "description" => "required|max:255",
         "image" => "required|image|max:3072"
        // "image" => "required|mimes:jpeg,jpg,png|max:3072"
      ]);
      
      if($validator->fails()){
        return response()->json([
          'success' => false,
          'message' => "Error de validacion",
          'errors' => $validator->errors()
        ], 422);
      }
      
      $imagenes = $request->file("image")->store("public/imagenes");
      $url_img = Storage::url($imagenes);
      $url_img = Str::replaceFirst("public", "storage", $imagenes);
    //   $data["image"] = $url_img;
      $data["user_id"] = Auth::user()->id;
      
      try {
        $post = Post::create($data);
        $post->image()->create(["url" => $url_img]);
        
        return response()->json([
            "success" =>true,
            "message" =>"Nuevo post creado",
            "post" => $post
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
