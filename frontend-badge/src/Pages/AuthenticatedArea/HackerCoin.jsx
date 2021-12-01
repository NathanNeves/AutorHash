import React,{useState,useEffect} from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Hacker from '../../hacker.svg';
import Developer from '../../developer.svg';
import Desktop from '../../desktop.svg';
import Security from '../../security.svg';
function HackerCoin(){
    return(
        <div style={{width:'94.9vw'}} className="flex flex-col  h-full">
             <div className="flex flex-wrap h-80 justify-around">
                <Card fullImage={true} style={{minHeight:'65vh'}} head="Trilha 1">
                    <div className="w-full">
                        <img className="w-full h-40" src={Desktop}/>
                    </div>
                    <div className="text-white mt-2">
                        <span className="font-bold">
                            Indicado para:
                        </span>
                        <span>
                            &nbsp;Programadores
                        </span>
                    </div>
                    <div className="text-white p-5 text-sm mt-2">
                        <span className="font-bold">
                            Descrição:
                        </span>
                        <span>
                        &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at molestie odio. Integer sem dui, finibus ut mi ac, lobortis congue neque. Proin et urna eros. Nunc mattis auctor enim, sit amet pretium mauris viverra vitae. In laoreet eu ipsum et ultricies. Cras condimentum enim at ex convallis, ut molestie urna fermentum. Donec blandit turpis ac finibus aliquam. Integer finibus, nibh in facilisis lacinia, ante risus mollis felis, sit amet elementum tortor leo a erat. 
                        </span>
                    </div>
                    <div className="p-5">
                        <Button>Comprar - 1500 HKC</Button>
                    </div>
                </Card>
                <Card fullImage={true} style={{minHeight:'65vh'}} head="Trilha 2">
                    <div className="w-full">
                        <img className="w-full h-40" src={Developer}/>
                    </div>
                    <div className="text-white mt-2">
                        <span className="font-bold">
                            Indicado para:
                        </span>
                        <span>
                            &nbsp;RH
                        </span>
                    </div>
                    <div className="text-white p-5 text-sm mt-2">
                        <span className="font-bold">
                            Descrição:
                        </span>
                        <span>
                        &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at molestie odio. Integer sem dui, finibus ut mi ac, lobortis congue neque. Proin et urna eros. Nunc mattis auctor enim, sit amet pretium mauris viverra vitae. In laoreet eu ipsum et ultricies. Cras condimentum enim at ex convallis, ut molestie urna fermentum. Donec blandit turpis ac finibus aliquam. Integer finibus, nibh in facilisis lacinia, ante risus mollis felis, sit amet elementum tortor leo a erat. 
                        </span>
                    </div>
                    <div className="p-5">
                        <Button>Comprar - 1500 HKC</Button>
                    </div>
                </Card>
                <Card fullImage={true} style={{minHeight:'65vh'}} head="Trilha 3">
                    <div className="w-full">
                        <img className="w-full h-40"  src={Security}/>
                    </div>
                    <div className="text-white mt-2">
                        <span className="font-bold">
                            Indicado para: 
                        </span>
                        <span>
                            &nbsp;Security Office
                        </span>
                    </div>
                    <div className="text-white p-5 text-sm mt-2">
                        <span className="font-bold">
                            Descrição:
                        </span>
                        <span>
                        &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at molestie odio. Integer sem dui, finibus ut mi ac, lobortis congue neque. Proin et urna eros. Nunc mattis auctor enim, sit amet pretium mauris viverra vitae. In laoreet eu ipsum et ultricies. Cras condimentum enim at ex convallis, ut molestie urna fermentum. Donec blandit turpis ac finibus aliquam. Integer finibus, nibh in facilisis lacinia, ante risus mollis felis, sit amet elementum tortor leo a erat. 
                        </span>
                    </div>
                    <div className="p-5">
                        <Button>Comprar - 1500 HKC</Button>
                    </div>
                </Card>
                <Card fullImage={true} style={{minHeight:'65vh'}} head="Trilha 4">
                    <div className="w-full">
                        <img className="w-full h-40"   src={Hacker}/>
                    </div>
                    <div className="text-white mt-2">
                        <span className="font-bold">
                            Indicado para:
                        </span>
                        <span>
                            &nbsp;Infra
                        </span>
                    </div>
                    <div className="text-white p-5 text-sm mt-2">
                        <span className="font-bold">
                            Descrição:
                        </span>
                        <span>
                        &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at molestie odio. Integer sem dui, finibus ut mi ac, lobortis congue neque. Proin et urna eros. Nunc mattis auctor enim, sit amet pretium mauris viverra vitae. In laoreet eu ipsum et ultricies. Cras condimentum enim at ex convallis, ut molestie urna fermentum. Donec blandit turpis ac finibus aliquam. Integer finibus, nibh in facilisis lacinia, ante risus mollis felis, sit amet elementum tortor leo a erat. 
                        </span>
                    </div>
                    <div className="p-5">
                        <Button>Comprar - 1500 HKC</Button>
                    </div>
                </Card>
                
                
             </div>
        </div>

    );

}


export default HackerCoin;