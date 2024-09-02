let keys, npub, main, prefix;
/*			*/
function HexToBech32(hrp, data, spec){
	let dec = [];
	for(let i=0,c=data.length; i<c; i+=2){
		dec.push(parseInt(data.substring(i, i+2), 16));
	}
	data = convertbits(dec, 8, 5, true);
	return encode(hrp, data, spec);
}
/*			*/
function GetKeys(){
	let keypair = bitcoinjs.ECPair.makeRandom();
	let privKey = keypair.privateKey.toString("hex");
	let pubKey = keypair.publicKey.toString("hex");
	//
	return [
		privKey,
		pubKey.substring(2)
	];
}
/*			*/
window.addEventListener("load", ()=>{
	main = document.getElementById("main-frame");
	prefix = document.getElementById("vanity-prefix");
	//
	prefix.addEventListener("keypress", function(e){
		if(this.value.length<1 || this.value.length>20)
			return;
		if(e.key === "Enter"){
			do{
				keys = GetKeys();
				npub = HexToBech32("npub", keys[1], "BECH32");
			}while(npub.substring(5, this.value.length-(-5)) != prefix.value);
			//
			main.innerHTML += "<div>"+
				"<div>private key: "+ keys[0] +"</div>"+
				"<div>public key: "+ keys[1] +"</div>"+
				"<div>npub: "+ npub +"</div>"+
			"</div>";
		}
	});
});
