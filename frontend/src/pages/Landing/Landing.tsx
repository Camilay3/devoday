import logo from "./../../assets/logo.svg";
import "./Landing.css";

export function Landing() {
	return (
		<>
			<section id="hero">
				<img src={logo} alt="Logo" draggable="false"/>
				<div className="heroMessage">
					<h1>Devocional day</h1>
					<h2>Seus devocionais, de forma <b>simples</b>.</h2>
				</div>
			</section>

			<section id="content">

			</section>
		</>
	);
}

