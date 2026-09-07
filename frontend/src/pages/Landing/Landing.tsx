import logo from "./../../assets/logo.svg";
import { Button } from '@/components/ui/button';
import { ArrowRight } from "lucide-react";
import "./Landing.css";

export function Landing() {
	return (
		<>
			<section className="flex pt-8 px-8 w-full gap-2 justify-end">
				<Button className="w-fit" size="lg" variant="outline">
					Entrar
				</Button>

				<Button className="w-fit" size="lg">
					Criar conta
				</Button>
			</section>
			<section id="hero">
				<img src={logo} alt="Logo" draggable="false"/>
				<div className="text-center flex flex-col gap-4 items-center">
					<h1 className="text-6xl font-bold">Devocional day</h1>
					<h2 className="text-5xl mb-4">Seus devocionais, de forma <b>simples</b>.</h2>
					<Button className="w-fit">
						Começar agora
						<ArrowRight />
					</Button>
				</div>
			</section>

			<section id="content">
				<div className="content">
					<div className="text-center">
						<h1 className="text-4xl font-bold">Conheça o devoday</h1>
						<div className="blocks">
							<div className="block">
								<h2 className="text-3xl font-semibold">Reflexões de leituras</h2>
								<p className="text-xl">Não sabe como meditar? O devoday pode te ajudar a aprender!</p>
							</div>

							<div className="block">
								<h2 className="text-3xl font-semibold">Sugestão diária</h2>
								<p className="text-xl">Não tem um plano de estudos? Conosco você pode ler o versículo sugerido do dia.</p>
							</div>

							<div className="block">
								<h2 className="text-3xl font-semibold">Constância</h2>
								<p className="text-xl">Controle sua constância nos estudos através das conquistas.</p>
							</div>
						</div>
					</div>
					<div className="message">
						<h1 className="text-4xl font-bold">O que é devocional day?</h1>
						<p className="text-xl mt-4">Devocional day é um projeto que surgiu a partir da dificuldade de novos cristãos em fazer devocional e/ou lectio divina. O projeto também é pensado em cristãos que sabem fazer mas possuem dificuldades em manter constância nos estudos bíblicos.</p>
					</div>
					<div className="message">
						<h1 className="text-4xl font-bold">Quem pode usar o devoday?</h1>
						<p className="text-xl mt-4">O Devoday é um site gratuito para todos os cristãos. A Bíblia está disponível de forma completa, podendo ser utilizada tanto por católicos quanto por evangélicos, desde que estejam dispostos a conhecer e amar mais a Cristo por meio da Palavra.</p>
					</div>
				</div>

				<div className="buttons flex flex-col gap-2">
					<Button variant="fill" size="lg">Começar agora</Button>
					<Button variant="link" className="text-foreground">Voltar ao topo</Button>
				</div>
			</section>
		</>
	);
}

