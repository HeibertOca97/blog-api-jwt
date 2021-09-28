import {useRef, useState, useEffect} from 'react';
import {Link, Switch, Route, useParams, useRouteMatch} from 'react-router-dom';

export function Post() {
    let { path, url } = useRouteMatch();

    useEffect(()=>{  
        document.querySelector("title").innerHTML = "Post | Blogger Dev";
    }, []);
    
    return (
        <>
        <h1 className="text-center mt-4 mb-4">Seccion de articulos</h1>
        
        <ul className="mb-4">
            <li>
            <Link to={`${url}`}>Crear</Link>
            </li>
            <li>
            <Link to={`${url}/listado`}>Listado</Link>
            </li>
        </ul>

         <Switch>
             <Route exact path={path}>
                <CreatePost />
            </Route>
            <Route path={`${path}/listado`}>
               <VerDatos/>
            </Route>
        </Switch>
        </>


    )
}

function CreatePost(){
    // const [titleState, titleSetState] = useState(null),
    // [desState, desSetState] = useState(null),
    // [imageState, imageSetState] = useState(null);

    const titleRef = useRef(""),
    descriptionRef = useRef(""),
    imageRef = useRef("");
    
    const createPost = async (e) => {
        // let form = new FormData();
        // form.append("description", description.value);
        // form.append("image", image.files[0]);
        e.preventDefault();
        let title = titleRef.current,
        description = descriptionRef.current,
        image = imageRef.current;

        try {
            const res = await axios.post("/auth/post", {
                data:{
                    title: title.value,
                    description: description.value,
                    image: image.files[0]
                },
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {success, message, post} = res.data;
            
            console.log(success);
            console.log(message);
            console.log(post);

        } catch (error) {
            const {success, message, errors} = error.response.data;
            if(error.response.status === 422){
                console.log(success);
                console.log(message);
                console.log(errors);
                // titleSetState(errors.title);
            }

            if(error.response.status === 401){
                console.log(success);
                console.log(message);
            }
        }
    }

    return (
        <div className="m-auto" style={{width: "25rem"}}>
            <form method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input ref={titleRef} type="text" name="title" id="title" className="form-control"/>
                    <span className="d-block text-danger m-2"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea ref={descriptionRef} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                    <span className="d-block text-danger m-2"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Miniatura:</label>
                    <input ref={imageRef} type="file" className="form-control-file" id="image" accept="image/*" />
                    <span className="d-block text-danger m-2"></span>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={createPost}>Crear</button>
                </div>
            </form>
            <br/><br/>
        </div>
    );
}

function VerDatos(){
    const [post, setPost] = useState([]);

    useEffect(()=>{
        const getPosts = async () => {
            try {
                const res = await axios.get("/auth/post");
                const {success, post} = res.data;
                console.log(success);
                console.log(post);
                setPost(post);
            } catch (error) {
                console.log(error.response.status);
            }
        }

        getPosts();
    }, []);

    return <p>Listado de datos: (<b>{post.length}</b>)</p>;
}
        