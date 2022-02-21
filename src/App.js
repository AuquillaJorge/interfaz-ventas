
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import swal from 'sweetalert';
function App() {

  const eventSubmit = (event) => {
    PeticionPut().then();
    event.preventDefault();
  }
  
  const PeticionPut = async (props) => {

    let num= (Math.random() * (8000 - 4000 + 1)) + 4000;
    var conDecimal = num.toFixed(0)
    let anio = document.getElementById('anio').value
    let mes = document.getElementById('mes').value
    console.log("añooo" + anio + "mes" + mes)
    let formData = new FormData();
    formData.append('anio', anio);
    formData.append('mes', mes);
    await fetch('/api/predict',
      {
        method: "POST",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': 'https://micode52.herokuapp.com/api/predict', 
        },
        body: formData
      }).then( response => response.json()).then( res => {
        
       let  a= res.prediccion;
       var conDecimal = a.toFixed(0)
       mostrarAlerta(conDecimal)
       
      }
      );

  } 

  const mostrarAlerta = (a) => {

    swal({
      title: "Accidentes de transito",
      text: " Existira un total de:  " + a,
      icon: "success",
      button: "Aceptar"

    })
  }

  return (

    <div className="App">
      <Form onSubmit={eventSubmit} >
        <h2>Predicción de incidentes de Tránsito con Machine Learning ECU911.</h2>
        <Form.Group className="mb-3" >
          <Form.Label>Año</Form.Label>
          <Form.Control type="number" id="anio" required />
          <Form.Text className="">
            Ingresar un año para realizar la Predicción
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Ingrese un mes</Form.Label>
          <Form.Control type="number" id="mes" required />
          <Form.Text className="">
            Ingresar un mes entre el 1 y el 12
          </Form.Text>
        </Form.Group>
        <Button variant="danger" type="submit">Predecir</Button>
      </Form>
    </div>

  );
}

export default App;
