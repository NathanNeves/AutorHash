import React,{useState,useEffect} from 'react';
import Card from '../../components/Card';
import Badge from '../../blue.svg';
import ReactTooltip from 'react-tooltip';
function Main(){
    const [hackerCoins,setHackerCoins] = useState(1500);
    const [desafiosRealizados,setDesafiosRealizados] = useState(10);
    const [position,setPosition] = useState(1);
    return(
        
        <div style={{width:'94.9vw'}} className="flex flex-col  h-full">
            <div className=" mt-10  h-12 text-center w-96 ">
                <span className="text-white    text-4xl font-bold">Olá Nathan</span>
            </div>
            <div className="flex  h-80 justify-around">
                <Card head="Autor Coins">
                    <span className="font-bold text-white text-6xl">
                        {hackerCoins}
                    </span>
                </Card>
                <Card head="Arquivos Registrados">
                    <span className="font-bold text-white text-6xl">
                        {desafiosRealizados}
                    </span>
                </Card>
                <Card head="">
                    <span className="font-bold text-white text-6xl">
                        {position}
                    </span>
                </Card>
            </div>
            <div style={{width:'90.8vw'}} className=" mt-32  h-20 ">
                <div className=" mt-10  h-12 text-center w-96 ">
                    <span className="text-white    text-4xl font-bold">Últimos arquivos</span>
                </div>
            </div>
            <div  className="flex flex-wrap mt-10 ">
                <img src={Badge} data-tip="<p>Descrição: Eternal Blue</p><p>Hash:0x0sda0sdadsadshsduhsdhusdhuadhuashu</p>" data-html={true} className="w-20 ml-10 mt-5"></img>
                <img src={Badge} data-tip="Teste" className="w-20 ml-10 mt-5"></img>
                <img src={Badge} data-tip="Teste" className="w-20 ml-10 mt-5"></img>
                <img src={Badge} data-tip="Teste" className="w-20 ml-10 mt-5"></img> 
            </div>

        </div>

    );


}

export default Main;