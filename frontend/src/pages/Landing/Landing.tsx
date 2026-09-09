import logo from "./../../assets/logo.svg";
import { Button } from '@/components/ui/button';
import { ArrowRight } from "lucide-react";
import "./Landing.css";
import { motion } from "motion/react";

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

			<div className="relative h-40 overflow-x-clip">
				<svg
					className="absolute bottom-0 left-1/2 h-64 w-[130%] -translate-x-1/2"
					viewBox="0 0 1200 180"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<defs>
						<filter id="wave-shadow" x="-20%" y="-40%" width="140%" height="180%">
							<feDropShadow dx="0" dy="-10" stdDeviation="7" floodColor="#8b8291" floodOpacity=".10" />
						</filter>
					</defs>
					<motion.g
						animate={{ x: [-100, 200, -100] }}
						transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
					>
					<motion.path
						fill="white"
						filter="url(#wave-shadow)"
						animate={{
							d: [
								"M-1200 56 C-1080 118 -990 22 -850 70 S-630 134 -470 62 S-220 24 0 82 C120 118 210 22 350 70 S570 134 730 62 S980 24 1200 82 C1320 118 1410 22 1550 70 S1770 134 1930 62 S2180 24 2400 82 V180 H-1200Z",
								"M-1200 72 C-1080 132 -970 34 -830 88 S-620 116 -450 48 S-220 40 0 98 C120 132 230 34 370 88 S580 116 750 48 S980 40 1200 98 C1320 132 1430 34 1570 88 S1780 116 1950 48 S2180 40 2400 98 V180 H-1200Z",
								"M-1200 56 C-1080 118 -990 22 -850 70 S-630 134 -470 62 S-220 24 0 82 C120 118 210 22 350 70 S570 134 730 62 S980 24 1200 82 C1320 118 1410 22 1550 70 S1770 134 1930 62 S2180 24 2400 82 V180 H-1200Z",
							],
						}}
						transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
					/>
					</motion.g>
					<g transform="translate(1200 0) scale(-1 1)">
						<motion.g
							animate={{ x: [100, -200, 100] }}
							transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
						>
							<motion.path
								fill="white"
								filter="url(#wave-shadow)"
								animate={{
									d: [
										"M-1200 94 C-1070 150 -970 58 -820 104 S-610 160 -440 94 S-210 54 0 116 C130 150 230 58 380 104 S590 160 760 94 S990 54 1200 116 C1330 150 1430 58 1580 104 S1790 160 1960 94 S2190 54 2400 116 V180 H-1200Z",
										"M-1200 108 C-1080 166 -960 64 -810 122 S-590 174 -420 76 S-200 70 0 128 C120 166 240 64 390 122 S610 174 780 76 S1000 70 1200 128 C1320 166 1440 64 1590 122 S1810 174 1980 76 S2200 70 2400 128 V180 H-1200Z",
										"M-1200 94 C-1070 150 -970 58 -820 104 S-610 160 -440 94 S-210 54 0 116 C130 150 230 58 380 104 S590 160 760 94 S990 54 1200 116 C1330 150 1430 58 1580 104 S1790 160 1960 94 S2190 54 2400 116 V180 H-1200Z",
								],
							}}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
							/>
						</motion.g>
					</g>
				</svg>
			</div>

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
					<Button variant="link" className="text-foreground"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						Voltar ao topo
					</Button>
				</div>
			</section>
		</>
	);
}
