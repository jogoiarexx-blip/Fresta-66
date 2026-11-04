# FRESTA — O LADO DE DENTRO
## Game Design Document (GDD) + plano técnico Three.js

**Versão:** 1.2 — 04/11/2026 (novo título FRESTA — O Lado de Dentro; Save Rooms, jumpscares, Diretor de Tensão e rejogabilidade)  
**Gênero:** survival horror psicológico, exploração, investigação e furtividade  
**Plataforma inicial:** navegador (PC), GitHub Pages; arquitetura preparada para versão desktop offline  
**Engine:** Three.js + JavaScript/TypeScript + Vite  
**Câmeras:** primeira pessoa e terceira pessoa sobre o ombro, alternáveis a qualquer momento seguro  
**Direção visual:** horror realista estilizado, estética PS2 de alta qualidade, materiais degradados, sombras e neblina localizada  
**Duração-alvo:** 3–4 horas para campanha completa; primeira versão jogável de 20–30 minutos  
**Regra de produção:** construir ambientes exploráveis de verdade, com salas, corredores, passagens e retorno consistente; nunca substituir jogabilidade por telas simuladas.

---

## 1. Conceito

**Título oficial:** FRESTA — O Lado de Dentro. **Título abreviado:** FRESTA. **Frase de divulgação:** “O pior não está atrás da porta. Está dentro da parede.” O nome “Vão 17” permanece apenas como identificação da câmara secreta na história, e não como título do jogo.

### Frase de apresentação

> Um edifício condenado guarda corredores que não constam em planta alguma. Com uma lanterna, uma planta predial incompleta e gravações do irmão desaparecido, uma engenheira precisa entrar nos vazios das paredes — e descobrir por que as paredes respondem quando alguém chama seu nome.

**FRESTA — O LADO DE DENTRO** se passa quase inteiramente no **Edifício Mirante**, um conjunto residencial de concreto e corredores estreitos. Não é um mundo aberto: é um labirinto *feito à mão*, organizado em áreas pequenas que se conectam organicamente. O horror vem de reconhecer o espaço, sair de uma sala, atravessar um corredor e perceber que alguma coisa se moveu atrás da parede.

O jogo combina:

- **Exploração de salas e corredores:** apartamentos, portaria, depósito, lavanderia, shafts, manutenção, subsolo e câmara estrutural.
- **Lanterna com função real:** iluminar, investigar rachaduras, identificar pistas em superfícies e, às vezes, denunciar a posição do jogador.
- **Duas perspectivas viáveis:** primeira pessoa para imersão; terceira pessoa sobre o ombro para percepção espacial, com animações e câmera sem atravessar paredes.
- **Passagens por buracos:** espiar, alcançar, rastejar, atravessar e descobrir rotas alternativas dentro das paredes.
- **Poucos inimigos significativos:** encontros tensos, comportamentos legíveis, perseguições ocasionais; sem hordas repetitivas.
- **Backtracking de verdade:** portas, pistas, rotas e mudanças de estado persistem quando o jogador retorna a uma área.
- **Save Rooms reais:** salas com iluminação e música próprias, gravação manual por fita, baú compartilhado e proteção absoluta contra criaturas.
- **Sustos autorais, não aleatórios baratos:** seis famílias de jumpscares, eventos narrativos e um Diretor de Tensão que evita repetição e respeita o ritmo.
- **Rejogabilidade:** detalhes variáveis, rotas opcionais, sustos condicionais e finais distintos, sem alterar arbitrariamente a geografia.
- **Narrativa ambiental:** fitas, bilhetes, marcas no concreto, telefonemas internos, detalhes de apartamentos e eventos que alteram a leitura de espaços conhecidos.

### O que diferencia o jogo

**As paredes são o mapa oculto.** Cada sala pode ter uma face pública e um lado interno. Às vezes a melhor rota não está na porta, mas num vão entre duas paredes. A arquitetura precisa fazer sentido mesmo quando o enredo introduz anomalias.

---

## 2. Princípios inegociáveis

1. **Todo objetivo acontece no mundo 3D.** O jogador abre portas, anda por corredores, entra em salas e alcança objetos fisicamente.
2. **Nada de teletransporte inexplicado.** Troca de área só quando existe passagem, escada, elevador, alçapão ou evento narrativo explícito.
3. **Lanterna útil, mas não frustrante.** Falta de bateria cria tensão; nunca causa bloqueio irrecuperável da campanha.
4. **Horror por ritmo e antecipação.** Exploração, sons nas paredes e ameaças dosadas; sustos não devem virar a única mecânica.
5. **Perspectivas equivalentes.** O jogo inteiro é terminável tanto em primeira quanto em terceira pessoa, sem puzzles inacessíveis por câmera.
6. **Persistência e continuidade.** Inimigos, portas, itens coletados, puzzles e documentos têm estados salvos.
7. **Performance faz parte do design.** Dividir o prédio em setores conectados; só simular e renderizar em detalhe setores necessários.
8. **Sem combate de tiro.** A defesa principal é observar, esconder, distrair, bloquear acessos e escapar.
9. **Refúgio é refúgio.** Nenhum monstro, jumpscare, perseguição, ataque ou evento de morte dentro de uma Save Room; a confiança do jogador nunca será traída por um susto barato.
10. **Sustos justos e controláveis.** Eventos respeitam colisão, linha de visão, rota de fuga e acessibilidade; nunca surgem exatamente no ponto de carregamento do save.

---

## 3. História completa

### 3.1. O passado do Mirante

O **Edifício Mirante**, inaugurado em 1989, foi projetado com corredores de manutenção entre conjuntos de apartamentos, grandes shafts hidráulicos e uma estrutura subterrânea mais extensa do que a aprovada. Nos anos 1990, uma empreiteira associada a um laboratório acústico iniciou clandestinamente o **Projeto ECO**, tentando usar cavidades de concreto como câmaras de ressonância e transmitir informações pelo edifício sem fios.

Os testes revelaram algo impossível: algumas cavidades passaram a **repetir vozes que ainda não haviam sido ditas**. Os técnicos atribuíram o fenômeno a interferências e alucinações; depois, começaram os desaparecimentos. O prédio não ficou simplesmente mal-assombrado: algo aprendeu a reconhecer a voz, a respiração e a memória de quem o atravessa.

Em **2004**, durante um apagão, 17 pessoas desapareceram na chamada *Noite do Silêncio*. Entre elas estava **Tomás Azevedo**, jovem auxiliar de manutenção que tentava expor o projeto. O caso foi encoberto como acidente estrutural. O prédio perdeu moradores gradualmente e foi interditado.

Em **2026**, na véspera da demolição, uma fita antiga chega à engenheira **Lia Azevedo**, irmã mais nova de Tomás. Na etiqueta há uma data do presente. Na gravação, a voz do irmão diz: *“Lia, não procure a sala 17. Procure o espaço que deveria existir entre a 16 e a 18.”*

### 3.2. Protagonista

**Lia Azevedo**, 33 anos, engenheira de inspeção estrutural. Não é militar nem investigadora sobrenatural. Sabe ler plantas, procurar fissuras, entender caminhos de manutenção e improvisar soluções físicas. Tinha 11 anos quando Tomás sumiu. Seus conhecimentos explicam mecanicamente a exploração de paredes, equipamentos e shafts.

**Características jogáveis:** movimentos humanos com peso, respiração sob estresse, postura cautelosa, corridas curtas, agachamento, lanternas e ferramentas simples. Não há acrobacias irreais.

### 3.3. Personagens e presenças

| Personagem | Função narrativa | Como aparece |
|---|---|---|
| Lia Azevedo | Protagonista; busca a verdade e o irmão | Modelo 3D completo; braços próprios em primeira pessoa |
| Tomás Azevedo | Irmão desaparecido; guia de confiabilidade variável | Gravações, ruídos, vultos e revelação final |
| Helena Vilar | Zeladora; última testemunha do Mirante | Bilhetes, rádio interno e encontro breve, se sobrevivente |
| Dr. Álvaro Salles | Responsável pelo Projeto ECO | Arquivos, fitas de teste, monitores antigos e interfone |
| O Oco | Consciência distribuída que habita os vãos estruturais | Vozes, vibrações, deslocamentos e manifestação na câmara final |

### 3.4. Progressão em cinco capítulos

#### Capítulo I — A porta que não abre (20–30 min)

**Locais:** entrada, portaria, recepção, corredor do térreo, sala do síndico, depósito, apartamento de serviço e primeiro vão na parede.

- Lia chega para verificar uma demolição prevista para o dia seguinte.
- O portão de acesso é fechado por dentro após uma queda de energia.
- A primeira planta do edifício mostra uma porta inexistente entre duas salas.
- Há uma batida no outro lado da parede. Três batidas curtas, uma longa.
- **Tutorial:** caminhar, trocar perspectiva, usar lanterna, abrir porta, examinar, agachar, espiar um buraco.
- **Puzzle 1:** localizar um disjuntor e realimentar uma fechadura eletromagnética, orientando a lanterna para ler números apagados numa caixa de manutenção.
- **Evento:** o jogador observa uma silhueta por uma fresta; ao chegar à outra sala ela não está lá, mas deixou um objeto físico.
- **Final:** atravessar o primeiro vão de manutenção e ver a planta do edifício tornar-se incompleta.

**Entrega MVP:** este capítulo precisa funcionar de ponta a ponta antes de expandir o prédio. Incluir a primeira **Save Room — Zeladoria / Sala 03** e os primeiros sustos controlados: o rosto no buraco, um falso alarme no corredor e uma mão na porta em condição narrativa.

#### Capítulo II — Os apartamentos vazios (35–50 min)

**Locais:** escadaria, corredor residencial, apartamentos 201–206, lavanderia, copa comunitária e shaft de ventilação.

- Vozes de antigos moradores são ouvidas através dos canos e paredes.
- Uma criança parece falar dentro de um armário, mas o cômodo está desocupado.
- O jogador obtém a primeira fita de Tomás e descobre o desaparecimento das 17 pessoas.
- **Puzzle 2:** reconstituir a numeração de apartamentos e alinhá-la com uma planta sobreposta; uma parede falsa encobre o acesso à lavanderia técnica.
- **Inimigo:** primeira patrulha do **Rastejante**. A criatura ouve passos, portas e objetos caindo, mas enxerga pouco.
- **Backtracking:** um corredor antes bloqueado abre por um acesso entre apartamentos; os apartamentos explorados continuam como foram deixados.
- **Final:** uma gravação feita décadas antes repete uma frase que Lia acabara de falar. O **Apto 204 — Copa Comunitária** é uma segunda Save Room ligada por atalho; no corredor pode ocorrer a aparição no espelho.

#### Capítulo III — A estrutura respira (40–55 min)

**Locais:** subsolo, bombas d’água, quadro elétrico, arquivos, depósito, corredor de tubulações e galeria atrás dos azulejos.

- O edifício deixa de parecer abandonado e mostra sinais de atividade recente.
- **Puzzle 3:** regular válvulas para reduzir a pressão nas galerias; som e vibração indicam combinações, enquanto a lanterna revela marcas de manutenção.
- **Novo comportamento:** o **Escriba** detecta feixes de luz prolongados e segue o rastro luminoso pelas superfícies.
- **Evento ambiental:** uma galeria cede de modo visível, criando nova passagem e bloqueando a rota antiga; a mudança permanece salva.
- **Revelação:** o Projeto ECO não se limitava a transmitir som — tentava registrar padrões de consciência nos vãos.
- **Final:** Lia encontra anotações de Tomás descrevendo uma entidade que aprende a imitar pessoas. O **Arquivo Técnico** funciona como terceira Save Room; o Escriba pode iniciar uma aparição pelo apagão da lanterna, mas nunca dentro dela.

#### Capítulo IV — O corredor impossível (35–50 min)

**Locais:** ala de experimentos, observação, sala de isolamento, corredor duplicado e manutenção superior.

- O jogo revisita salas conhecidas por ângulos diferentes, agora com acessos internos nas paredes.
- Ao ouvir uma voz familiar, o jogador precisa decidir se a segue ou verifica primeiro suas pistas.
- **Puzzle 4:** associar padrões de três batidas e uma pausa às posições de placas acústicas, desligando três emissores.
- **Perseguição única, curta e legível:** um caçador atravessa a estrutura pela galeria lateral; Lia precisa usar portas e um vão estreito — não correr indefinidamente.
- **Revelação:** Tomás nunca saiu da rede de cavidades; parte de suas memórias é usada pela entidade para atrair Lia.
- **Final:** Lia encontra o acesso à câmara central, chamada nos desenhos de **Vão 17**. A **Sala de Observação** é a quarta Save Room, antes da descida final, com aviso explícito de ponto de não retorno quando aplicável.

#### Capítulo V — O que ficou entre nós (30–40 min)

**Locais:** galeria de acesso, sala de controle, câmara estrutural, passarela de manutenção e saída alternativa.

- O Oco utiliza vozes de moradores e do irmão para criar escolhas emocionalmente difíceis.
- O jogador precisa decidir quais gravações são testemunhos e quais são tentativas de manipulação, usando evidências recolhidas.
- **Puzzle final:** controlar alimentação, ressonadores e travas de uma câmara enquanto evita exposição prolongada da lanterna às superfícies sensíveis.
- A campanha termina com escolhas que dependem tanto da decisão quanto dos documentos/ações anteriores.

### 3.5. Finais

**Final A — Concreto selado:** Lia destrói os emissores e sela as cavidades. A rede silencia, a demolição é interrompida, mas as consciências presas não são recuperadas. O edifício fica quieto pela primeira vez.

**Final B — Vozes livres:** Lia libera os arquivos acústicos e abre as galerias. As 17 vozes tornam-se audíveis do lado de fora; a verdade é exposta, porém o Oco talvez tenha encontrado outros lugares onde viver.

**Final C — A décima oitava voz (secreto):** ao registrar os testemunhos completos, preservar a fita original de Tomás e estabilizar os três emissores em vez de destruí-los, Lia isola a entidade, salva os testemunhos e ouve uma última mensagem autêntica do irmão. O final é conclusivo, mas não apaga o custo humano.

---

## 4. Geografia e level design

### 4.1. Regras de construção

- Mapa modular com **salas de 4–10 m de extensão**, **corredores de 1,6–2,5 m de largura** e **pé-direito de 2,6–3,2 m**; variar medidas conforme ambiente.
- Evitar corredores excessivamente idênticos. Cada setor deve ter uma forma, cor/iluminação e marco visual reconhecível: relógio, infiltração, carrinho de limpeza, rachadura, porta azul etc.
- Portas reais com dobradiça ou deslizamento coerente, colisão, animação e estados persistentes.
- O edifício pode conter desvios paranormais **somente em momentos sinalizados**. O jogador deve conseguir compreender qual passagem percorreu.
- Nenhuma sala vazia sem função: cada uma deve conter pista, ameaça, recompensa, atalho, leitura de história ou mudança de atmosfera.
- Preferir **conexões de mão dupla**. Trancar o jogador definitivamente exige justificativa narrativa e alternativa segura.

### 4.2. Planta orientadora — primeiro capítulo

```text
         [PORTÃO / RUA]
                |
           [PORTARIA]----[ZELADORIA / SALA 03]
                |
            [RECEPÇÃO]----[SALA SÍNDICO]
                |
     ====== CORREDOR PRINCIPAL ======
       |             |              |
    [BANHEIRO]    [DEPÓSITO]   [APTO SERVIÇO]
                       |              |
                    [VÃO A] <--- [FRESTA B]
                       |
               [GALERIA INTERNA]
                       |
                [ESCADA / CAP. II]
```

**Importante:** as linhas acima são conexões de fluxo, não escala geométrica. A planta 3D deve respeitar medidas, espessura das paredes, colisões e aberturas compatíveis. O Vão A não pode ocupar o mesmo volume de uma sala convencional.

### 4.3. Tipos de ambiente

| Ambiente | Função de jogo | Distinção visual/sonora |
|---|---|---|
| Portaria | Introdução, mapa e acesso à primeira sala segura | Vidro sujo, interfone chiando, relógio parado |
| Zeladoria / Sala 03 | Primeira Save Room, gravador e baú de itens | Lâmpada âmbar, fita girando, música suave e porta azul |
| Sala do síndico | Planta, chave e narrativa | Mesa, armários e quadro de energia |
| Apartamento | Exploração, tensão e evidências | Móveis velhos, retratos, objetos específicos |
| Corredor residencial | Navegação e encontros | Portas numeradas, luz piscando com parcimônia |
| Lavanderia | Puzzle e rotas alternativas | Máquinas, canos, goteiras e eco metálico |
| Shaft de parede | Furtividade e travessia | Espaço estreito, cabos, poeira e respiração |
| Subsolo | Gestão de energia e som | Bombas, água rasa, grandes tubulações |
| Laboratório acústico | Revelação da trama | Módulos de testes, fitas, painéis e vidro |
| Câmara Vão 17 | Clímax | Escala mais ampla, concreto irregular e vozes |

### 4.4. Sistema de buracos e paredes

As aberturas não são apenas decalques: são **volumes navegáveis** com colisão e regras de interação.

1. **Fresta para espiar:** aproximação + interação; câmera desloca poucos centímetros para uma vista limitada, sem atravessar a malha.
2. **Buraco para alcançar:** braço entra para pegar objeto, destravar tranca ou empurrar peça; animação apropriada nas duas câmeras.
3. **Buraco rastejável:** largura e altura suportam passagem agachado; animação curta de entrada/saída, com câmera e colisão sincronizadas.
4. **Parede frágil:** pode ser aberta com ferramenta ou mecanismo; alteração permanente no mapa e no save.
5. **Vão acústico:** permite ouvir ou interagir com elementos do outro lado, mas não atravessar até desbloquear a estrutura.

**Pistas de legibilidade:** corrente de ar, poeira iluminada, som direcional, tinta quebrada, marca no rodapé. Nem todo buraco guarda um susto ou inimigo.

**Dados obrigatórios por abertura:** `id`, `roomA`, `roomB`, `type`, `dimensions`, `requiredAction`, `open`, `traversable`, `persist`, `colliderId`, `occlusionPortalId`.

---

## 5. Loop principal de jogabilidade

```text
Explorar corredor/sala
       ↓
Notar som, detalhe ou irregularidade
       ↓
Investigar com lanterna / aproximação / documentos
       ↓
Resolver obstáculo OU contornar por abertura na parede
       ↓
Encontrar ameaça, pista ou atalho
       ↓
Atualizar planta + estado do setor + checkpoint
       ↓
Retornar à Save Room para salvar manualmente / guardar itens
       ↓
Retornar, desbloquear nova área e avançar na história
```

O jogador precisa alternar entre **curiosidade** e **cautela**. A lanterna dá informação, mas pode aumentar risco. O caminho óbvio nem sempre é o mais seguro; passagens pequenas podem evitar uma criatura, mas expõem Lia a sons e falta de visibilidade.

---

## 6. Lanterna: mecânica principal

### 6.1. Estados

| Estado | Vantagem | Custo/Risco |
|---|---|---|
| Desligada | Furtividade, menor chance de detecção por luz | Pouca visibilidade; sons e luz ambiental tornam-se essenciais |
| Feixe aberto | Exploração comum, boa leitura de sala | Consumo normal; ilumina uma área ampla |
| Feixe concentrado | Revela detalhes distantes e fissuras em ângulo rasante | Maior intensidade; Escriba percebe o feixe com facilidade |
| Luz de emergência por dínamo | Evita bloqueio por falta de pilha | Feixe fraco e temporário após acionamento manual |

### 6.2. Regras de bateria

- Barra de **0–100%**, sem drenagem arbitrária em menus ou pausas.
- Referência inicial para balanceamento: **8 minutos contínuos no feixe aberto** e **4 minutos no concentrado**; ajustar após playtests reais.
- Pilhas coletáveis limitadas e posicionadas em locais plausíveis, com algumas reservas garantidas antes de puzzles indispensáveis.
- Ao esgotar, **segurar F por 2 segundos aciona o dínamo**, garantindo cerca de **15 segundos de luz fraca**; recarga do dínamo com cooldown de 25 segundos. Valores ajustáveis.
- Não esconder objetivos obrigatórios atrás de uma bateria que possa acabar definitivamente.
- Sinalizar últimos 15% por queda de intensidade e ruído, não por piscadas incessantes.

### 6.3. Uso investigativo

- Feixe rasante realça fissuras, pequenas inscrições e poeira; pistas essenciais também devem admitir aproximação e exame.
- Certas marcas reagem ao ângulo da luz, não simplesmente ao botão “ligar”.
- Espelhos, azulejos e vidros refletem **indícios limitados**, sem exigir reflexões dinâmicas caras para tudo.
- A criatura pode reagir ao **ponto iluminado** ou ao jogador, dependendo da espécie; as duas lógicas não devem ser confundidas.
- A lanterna não deve funcionar como arma de dano; usá-la para distração é estratégia, não combate.

### 6.4. Implementação Three.js

- `SpotLight` presa ao suporte de câmera, mas com a origem suavizada para parecer uma lanterna física na mão/peito.
- Ajustar `angle`, `penumbra`, `distance`, `decay` e `intensity` por modo; usar `target` e animação amortecida para reduzir efeito de ponteiro rígido.
- **Apenas uma luz dinâmica principal projetando sombras** no setor ativo. Controlar resolução e distância do shadow map.
- Luzes estáticas da arquitetura por emissivos, lightmaps e poucas luzes locais; não criar dezenas de `PointLight` com sombras.
- Para pistas visuais, preferir materiais e decals que respondam à luz ou um shader simples e determinístico; evitar efeitos de pós-processamento pesados.
- A detecção inimiga deve usar cones, distância, portas, raycasts de oclusão e estado da lanterna — **não** depender de pixels renderizados.

---

## 7. Primeira pessoa e terceira pessoa

### 7.1. Requisito funcional

A tecla **V** alterna entre as perspectivas durante a exploração. A transição deve ser curta e suave, sem perder posição, direção de movimento, foco de interação ou estado de inimigos.

**Primeira pessoa**

- Câmera em altura aproximada dos olhos; cabeça do modelo ocultada apenas para a câmera local.
- Braços/mãos/lanterna visíveis onde necessário; animações de alcançar, empurrar, abrir portas e usar dínamo.
- Leve *head bob* opcional, com regulagem para conforto; proibir sacudidas fortes obrigatórias.
- Campo de visão ajustável (ex.: 70–90°).

**Terceira pessoa**

- Câmera sobre o ombro, distância-alvo aproximada 2,2–3 m, deslocamento lateral de 0,35–0,55 m.
- Colisão por *sphere cast* (ou raycast com raio aproximado) entre pivot da personagem e posição desejada da câmera; aproximar em locais apertados.
- Em corredores estreitos, reduzir deslocamento lateral automaticamente para não ocultar a visão.
- Orientação de tronco, cabeça e braço da lanterna deve mirar na mesma direção efetiva do feixe.
- Animações `idle`, `walk`, `backpedal`, `strafe`, `run`, `crouch`, `crouchWalk`, `peek`, `squeeze`, `interact`, `startled`, `hurt` e `death` sem deslizar pés.

**Nos buracos estreitos:** mudar distância e enquadramento automaticamente, sem mudar permanentemente a perspectiva escolhida. Durante a travessia, uma animação contextual pode controlar a câmera por até poucos segundos; devolver o controle ao final. Não transportar o jogador para outra posição desconectada.

### 7.2. Controles PC

| Ação | Tecla/entrada |
|---|---|
| Caminhar | WASD |
| Olhar | Mouse |
| Correr | Shift (com fôlego limitado) |
| Agachar / levantar | Ctrl ou C |
| Interagir / pegar / abrir | E |
| Lanterna ligar/desligar | F |
| Acionar dínamo | Segurar F quando a bateria estiver vazia |
| Feixe concentrado | Botão direito do mouse, segurar |
| Alternar 1ª / 3ª pessoa | V |
| Inventário / mapa | Tab / M |
| Lanterna e item no mundo: usar | Botão esquerdo, contextual |
| Pausa / configurações | Esc |

**Gamepad:** analógicos para andar/olhar; RT ou gatilho para concentrar luz, LB para lanterna, X para interagir, B para agachar, Y para alternar câmera. Permitir remapeamento depois do MVP.

**Mobile:** não incluir controles improvisados na primeira versão. Construir interface responsiva e suporte touch em etapa própria, quando desempenho e jogabilidade estiverem certificados no PC.

### 7.3. Acessibilidade

Sensibilidade do mouse, inversão vertical, FOV, intensidade de movimento da câmera, opção sem *head bob*, contraste da mira e legendas para áudios. Nunca fazer puzzle obrigatório depender exclusivamente de ouvir frequências; fornecer vibração, texto ou indicador visual alternativo.

---

## 8. Ameaças e inteligência artificial

### 8.1. O Rastejante

**Visual:** corpo humano muito magro, movimentos desconjuntados mas anatômicos, pele coberta de pó de concreto; silhueta reconhecível em distância curta.

**Comportamento:** anda entre corredor e tubulações, investiga sons, para para escutar, entra em vãos permitidos, perde o jogador quando a rota é quebrada por portas/obstáculos. A luz tem pouca influência.

**Contrajogo:** caminhar lentamente, agachar, fechar portas com cuidado, arremessar pequenos objetos para outro ponto e usar passagens alternativas.

### 8.2. O Escriba

**Visual:** figura coberta por tiras de papel de planta arquitetônica e resíduos de tinta; percebe-se primeiro seu contorno nas paredes.

**Comportamento:** reage ao feixe de lanterna mantido num mesmo local, patrulha corredores com superfícies claras e investiga marcas recentemente iluminadas.

**Contrajogo:** usar pulsos curtos de luz, feixe aberto com cautela, apagar a lanterna, contornar superfícies expostas e esconder-se atrás de obstáculos reais.

### 8.3. O Oco

**Visual:** não é um monstro comum vagando por todos os quartos. Manifesta-se como deformação e vibração nas juntas do concreto, sombra incompleta e vozes que parecem sair das paredes.

**Comportamento:** presença territorial e roteirizada em momentos-chave; influencia portas e sons, pode guiar um inimigo para outro setor, mas não muda o mapa sem consequência observável.

**Contrajogo:** interpretar padrões, interromper ressonadores, perceber vozes falsas e usar as rotas internas descobertas.

### 8.4. Máquina de estados

```text
IDLE / SLEEP
   ↓ (som, luz ou evento)
INVESTIGATE
   ↓ (pista confirmada)
SEARCH
   ↓ (jogador visível / alcançável)
CHASE
   ↓ (linha de visão perdida)
LAST_KNOWN_POSITION
   ↓ (tempo + busca sem sucesso)
RETURN_TO_PATROL
   ↓
PATROL
```

**Regras técnicas:**

- Usar navegação por grafo de salas, portas e portais de passagem; pathfinding local quando necessário.
- `lineOfSight` e oclusão reais: inimigo não enxerga por parede, porta fechada ou teto.
- Audição baseada em tipo do som, raio e atenuação por barreiras; uma porta fechada reduz percepção.
- Só permitir acesso a buracos quando o tipo de criatura e as dimensões forem compatíveis.
- Não teletransportar inimigos para perto do jogador; spawn/despawn apenas fora da percepção com justificativa e regras registradas.
- Máximo típico de **uma ameaça ativa por setor**; duas apenas em situação final explicitamente dirigida e testada.
- IA de setores distantes é suspensa ou atualizada em baixa frequência; estado persiste no save e na mudança de área.
- Estados de captura e morte precisam de telemetria de causa para QA; reinício em ponto seguro, nunca dentro de armadilha insolúvel.

---

## 9. Puzzles e exploração

| ID | Local | Desafio | Pistas | Resultado persistente |
|---|---|---|---|---|
| P01 | Térreo / quadro elétrico | Reativar fechadura | Números e desgaste no painel | Porta principal liberada |
| P02 | 2º andar / apartamentos | Cruzar planta e numeração real | Marcas nas molduras e registro do síndico | Parede falsa revelada |
| P03 | Subsolo / bombas | Equilibrar pressão de válvulas | Manômetros, som e anotações | Galeria transitável |
| P04 | Ala acústica | Sincronizar placas por padrão de batidas | Fitas, placas numeradas, respostas sonoras | Emissores desativados |
| P05 | Vão 17 | Redirecionar alimentação e ressonância | Evidências anteriores e painel físico | Desbloqueio do final |

Cada puzzle terá os estados `unseen`, `discovered`, `attempting`, `solved` e `persisted`, além de *hints* graduais após exploração real. Nenhum puzzle deve depender de tentativa cega ou de precisão de um único pixel.

**Inventário enxuto:** pilhas, chave, fita, ferramenta, planta, evidências; capacidade pequena, mas documentos ficam em diário sem ocupar espaço. Evitar coleta excessiva.

**Inspeção:** girar objeto 3D ou aproximar com zoom; ler textos em overlay acessível. Não obrigar o usuário a decifrar textura borrada.

---

## 10. Progressão, salvamento e backtracking

### 10.1. Salvamento

- **Salvamento manual principal em Save Rooms**, por interação com um gravador de fita ou aparelho equivalente; ilimitado na dificuldade padrão, sem exigir item consumível.
- **Autosave de proteção separado:** checkpoints discretos em marcos importantes, conclusão de puzzles e transições de capítulo. Não fazer autosave a cada porta, para preservar o valor da Save Room; dificuldade clássica pode reduzir checkpoints, sem criar estados impossíveis.
- Estado local persistente em `localStorage` ou IndexedDB com **versão de schema**, migração e recuperação de falhas.
- Opcional: exportar/importar arquivo JSON de save, útil em uso offline.
- Dados salvos: capítulo, posição segura, câmera, inventário, bateria, portas, buracos, puzzles, documentos, eventos, inimigos, checkpoints, tempo de jogo, finais disponíveis, Save Room descoberta, armazenamento compartilhado, histórico de sustos, cooldown e estado do Diretor de Tensão.
- Não restaurar a personagem dentro de geometria, fechaduras travadas ou setor descarregado.

### 10.2. Retorno por salas

- Ao voltar a uma sala, os itens já coletados permanecem ausentes; portas destravadas permanecem destravadas; buracos abertos continuam abertos.
- Uma criatura só retorna se houver **evento narrativo de reentrada documentado** ou circulação real por conexões existentes.
- Eventos de história podem alterar iluminação, sons ou objetos, mas essa alteração é salva e o caminho continua fisicamente coerente.
- O mapa distingue: sala visitada, sala investigada, sala com pista pendente e passagem bloqueada.

### 10.3. Save Rooms — as salas de segurança absoluta

**Referência de design:** a sala segura clássica do survival horror. Ela é uma ferramenta de ritmo, navegação e preparação; não é apenas uma tela de salvamento. Em FRESTA, chama-se **Sala de Escuta**, e cada uma existe dentro de uma sala física reconhecível do prédio.

**Regra absoluta:** o jogador jamais sofre dano, morte, perseguição ou jumpscare dentro de uma Save Room. A IA não atravessa seu limite. Nenhum susto falso usa o espelho, janela, armário ou porta da sala. A confiança nessa regra faz os corredores parecerem ainda mais perigosos.

| Capítulo | Save Room física | Como encontrá-la | Função adicional |
|---|---|---|---|
| I | Zeladoria — Sala 03 (térreo) | Porta azul junto à portaria; descoberta cedo | Tutorial de gravar fita, ouvir música e usar baú |
| II | Copa Comunitária — Apto 204 | Atalho no corredor residencial; não é obrigatório cruzar inimigo para retornar | Guardar itens e reorganizar a rota dos apartamentos |
| III | Arquivo Técnico (subsolo) | Ligado ao setor de bombas por porta vedada | Estudar plantas, ouvir gravações, desbloquear atalho |
| IV | Sala de Observação (ala acústica) | Antes das galerias finais | Revisar provas e preparar o ponto de não retorno |
| V | Retorno à Sala de Observação ou último checkpoint narrativo | Acesso justificado pela geometria da ala final | O capítulo nunca exige atravessar corredor impossível só para salvar |

**Identidade ambiental de todas elas:** lâmpada fixa quente/amarelada, gravador analógico ou rádio, mesa de trabalho, caixa de armazenamento, uma cadeira e uma pequena melodia original. A iluminação não pisca por susto; música suave surge ao entrar e termina suavemente ao sair. Elementos variam por sala, mantendo a mesma linguagem visual. A lanterna pode ser desligada sem deixar o espaço ilegível.

**Interações:**

1. **Gravador de fita — SALVAR:** interação contextual abre 3–5 slots manuais com data de jogo, setor, tempo e miniatura opcional; confirma gravação concluída; não usa consumível na dificuldade normal. O gravador funciona offline.
2. **Baú ou armário lacrado — ARMAZENAR:** inventário compartilhado entre salas seguras, com mesma fonte de verdade, sem duplicação; documentos importantes ficam no diário, não no baú.
3. **Mesa de evidências — EXAMINAR:** ler mapa e registros, recompor pistas e identificar objetivos; não congela nem altera magicamente o estado do mundo externo.
4. **Descanso curto — RESPIRAR:** recupera fadiga/estabilidade da câmera se esse sistema existir, mas não regenera automaticamente recursos raros nem apaga progresso da IA.
5. **Porta de saída — VOLTAR:** interação e animação de abertura sem teleporte; sempre há orientação espacial e um caminho de volta viável.

**Regras de IA e segurança:**

- `safeRoom=true` é um atributo semântico da sala, não apenas uma região de luz. `RoomGraph` identifica portas e limites; `Navigation` proíbe arestas de entrada para inimigos.
- A criatura que perseguia Lia **perde o alvo ao entrar**, recua para patrulha ou busca do lado externo após um pequeno tempo. Não desaparece visualmente se o jogador estiver olhando; deve seguir uma rota válida ou ocultar-se legitimamente atrás de geometria.
- **Proibir camping:** o inimigo não pode aguardar colado à soleira. Ao sair, assegurar uma pequena zona de saída livre (ajuste inicial de 4 m / 8 s) antes de permitir novo ataque, exceto em cena claramente sinalizada e sem ataque inevitável.
- Nunca disparar eventos hostis por proximidade, luz da lanterna, tempo parado, abrir baú, gravar ou carregar jogo dentro da sala.
- A segurança não pode ser removida por capítulo, final ou dificuldade. Para permitir ataque numa antiga sala, primeiro convertê-la explicitamente em **outro espaço narrativo**, retirando todos os sinais de Save Room e oferecendo outro abrigo; a versão inicial **não fará isso**.

**Persistência:** sala descoberta, item box, status de save e estado das portas seguem estáveis. Um save manual carrega Lia no interior, sem monstro no limiar, com câmera e colisores válidos. O sistema previne salvamento corrompido com escrita em duas etapas, versão de schema, backup ou último slot válido.

### 10.4. Seis famílias de jumpscares — eventos concretos

Jumpscares são acontecimentos com **início, contexto, pista, reação e consequência**. Não são pop-ups 2D colados na câmera. São criaturas ou objetos 3D em posição coerente, com animação, áudio espacial e oclusão real.

| ID | Tipo / local | Gatilho verificável | Sustos e reação de Lia | Resultado jogável |
|---|---|---|---|---|
| JS01 | **Rosto no buraco** — parede de depósito | Lia inspeciona fresta específica com feixe por tempo suficiente e evento não consumido | Um rosto aparece atrás da abertura, inspira bruscamente e se retrai; Lia recua / treme o braço | Pista física aparece do outro lado; susto ocorre no máximo uma vez por campanha |
| JS02 | **Corredor e lanterna** — bloco residencial | Condições de história + corredor visível + diretor permite; não perto de Save Room | Luz falha por instante; silhueta entra no campo de visão pela lateral física | Ameaça curta ou vestígio que leva a rota investigável, sem bloqueio inevitável |
| JS03 | **Mão pela porta** — sala técnica | Primeira abertura de porta marcada após pista sonora | Dedos atravessam fresta **existente na malha/colisor**, Lia puxa a mão; pancada na madeira | Pode fechar a porta e recuar; a porta mantém estado coerente |
| JS04 | **Espelho** — banheiro do 2º andar | Reflexo em ângulo correto e flag narrativa | Figura aparece **no reflexo**, imóvel atrás de Lia; some ao virar | Ruído revela ventilação secreta; sem usar o espelho de uma Save Room |
| JS05 | **Ruptura da parede / perseguição** — subsolo | Puzzle altera pressão e fratura previamente indicada | Criatura rompe trecho frágil com partículas/debris leves; câmera reage | Fuga curta por rota previamente acessível, com saída e cobertura testadas |
| JS06 | **Falso susto** — corredor de serviço | Interação com som atrás de parede, diretor em baixa tensão | Batidas, queda de objeto ou sombra; não surge criatura | Mais tarde pode haver consequência diferente naquele mesmo ponto, sem repetição previsível |

**Regras de execução:**

- **Primeira pessoa:** visão do rosto/mão em espaço 3D e reação breve dos braços/lanterna; preservar controle ou devolver em menos de ~0,6 s após animação. Sem teletransporte da câmera.
- **Terceira pessoa:** animação de susto do corpo inteiro (passo para trás, cabeça, ombros, braço); posicionar câmera para mostrar a ameaça e Lia sem entrar em parede ou revelar assets não carregados.
- **Áudio 3D:** precursores sutis, golpe ou respiração espacial, decaimento curto. Evitar picos de volume agressivos, distorção contínua e trilhas simultâneas acumuladas.
- **Efeito de câmera:** impulso leve, amortecido e configurável; sem flash branco obrigatório, cortes bruscos ou travamentos prolongados.
- **Consequência justa:** não tirar controle durante ataque inevitável, nem posicionar a ameaça dentro da cápsula do jogador; a aparição deve respeitar portas, luz, malha e rota.
- **Uma vez é uma vez:** os eventos roteirizados têm `eventId` persistente e `triggered=true`; recarregar um save posterior não repete o evento. Um save anterior pode reproduzi-lo, mas a introdução pode variar para não se tornar mecânica punitiva.
- **Espaço negativo:** nem todo buraco, espelho ou porta terá susto. A maioria deve servir primeiro à exploração e à história, para manter a surpresa.

### 10.5. Diretor de Tensão — sustos adaptativos com IA de regras

O Diretor é um sistema **determinístico e auditável de regras de jogo**, sem necessidade de API de inteligência artificial, rede ou modelo generativo. Ele controla *quando e onde* um susto elegível pode disparar, sem criar monstros do nada ou contrariar fatos do cenário.

**Entradas observadas:** `currentRoomId`, `safeRoom`, `cameraMode`, `flashlightOn`, `flashlightFocus`, `battery`, `playerFacing`, `lineOfSight`, `noise`, `lastThreatTime`, `recentScares`, `visitedRooms`, `storyFlags`, `difficulty`, `accessibility`.

**Estados globais:** `CALM` → `UNEASE` → `PRESSURE` → `PEAK` → `RECOVERY`. O diretor usa a exploração, a exposição ao escuro e os encontros já ocorridos para ajustar a tensão. Uma Save Room impõe `CALM`, impede eventos e suspende ataques; a saída respeita uma janela inicial sem hostilidade.

**Filtros antes de disparar:**

1. O jogador está fora da Save Room, fora da zona protegida e não está em menu, carregamento, transição de câmera ou animação sem saída.
2. O evento é válido para o capítulo, sala, contexto narrativo, tamanho da passagem e estado físico da parede/porta.
3. O ponto de aparição tem geometria, oclusão e posição alcançável para a criatura ou ilusão; não acontece a centímetros do rosto sem causa espacial.
4. Há condições de linha de visão e de áudio apropriadas; a câmera escolhida consegue ver ou perceber o mesmo evento.
5. O cooldown não está ativo e o evento não foi consumido; eventos recentes do mesmo tipo têm peso menor.
6. O jogador possui controle, rota de fuga e chance de resposta, se o evento trouxer perigo real.

**Frequência de ajuste inicial:** sustos dinâmicos raros, em geral separados por pelo menos 4–8 minutos de exploração ativa, com variação contextual; roteirizados da história são avaliados separadamente. Evitar relógio rígido que o jogador possa decorar. No máximo um jumpscare intenso em sequência; após `PEAK` inserir um período `RECOVERY` sem novo susto agressivo. Não disparar imediatamente depois de abrir um save, sair da sala segura ou morrer.

**Rejogabilidade sem repetição artificial:**

- Existem pontos candidatos alternativos por setor (ex.: frestas A/B/C). O Diretor pode selecionar um candidato válido, mas nunca alterar a planta permanentemente sem história.
- Introdução sonora, ângulo de entrada e intensidade podem variar com *seed* local e histórico. Ameaças narrativas fundamentais têm posição e consequência fixas.
- O retorno a uma sala pode apresentar um novo ruído ou alteração coerente **somente** se um gatilho anterior habilitou a mudança; coletáveis, trancas e puzzles não renascem.
- Persistir `consumedEvents`, `directorSeed`, `pressureState`, `cooldownUntil` baseado em tempo de jogo, `visitCounts`, `recentScareTypes` e condições narrativas. Não depender de relógio da máquina para burlar segurança.
- Desafios de replay: finais alternativos, fitas opcionais, pequenas variações de patrulha, rotas internas extras e ocorrências não obrigatórias. Nunca sortear posição de item essencial sem pista.

**Exemplo de configuração de evento (dado, não código de produção):**

```json
{
  "id": "JS01_HOLE_FACE",
  "roomId": "ch1_storage",
  "kind": "hole_face",
  "storyRequirements": ["breaker_on"],
  "candidateHoleIds": ["ch1_hole_a"],
  "oncePerCampaign": true,
  "disabledInSafeRooms": true,
  "mustBeVisible": true,
  "minSecondsFromLastIntenseScare": 240,
  "cameras": ["firstPerson", "thirdPerson"],
  "reaction": "flinch_back",
  "persistenceKey": "events.JS01_HOLE_FACE"
}
```

**Acessibilidade:** oferecer intensidades `suave / padrão / intensa`; opção de reduzir tremor, flashes e picos de áudio; controle de campo de visão, legendas direcionais, brilho e animações de reação. Em `suave`, nenhum item, objetivo ou final deixa de ser acessível; apenas a apresentação muda.

### 10.6. Regras de localização, som e portas — integração das salas seguras

- `RoomManager` identifica entrada/saída de cada sala; `SafeRoomSystem` ajusta música, iluminação fixa, bloqueios da IA e interação de save.
- `AudioDirector` faz crossfade da música de Save Room e abafa o ambiente ameaçador exterior, mas mantém sons de interface e passos internos.
- `DoorSystem` mantém portas reais com colisão/oclusão. A porta da Save Room não é um botão de teleporte e não autoriza inimigos a atravessarem o limite.
- `SaveManager` cria snapshot do `WorldState` incluindo inventário compartilhado e flags de susto; `CheckpointSystem` permanece independente da gravação manual.
- `ScareDirector` seleciona eventos elegíveis somente **após** as validações de `SafeRoomSystem`, `RoomGraph`, `Navigation` e `StoryFlags`.

---

## 11. Direção de arte

### 11.1. Estética

**Referência de sensação:** horror de corredores fechados e câmera próxima, porém com identidade própria. Evitar copiar personagens, cenários, nomes, trilha ou puzzles de franquias existentes.

**Materiais:** concreto aparente, azulejo gasto, tinta descascada, metal enferrujado, madeira úmida, vidros opacos, carpetes antigos e poeira. Baixa saturação; uma cor específica identifica cada andar para orientação espacial.

**Geometria:** low-poly com silhuetas cuidadas, materiais PBR simples e iluminação seletiva. O alvo é parecer um jogo 3D consistente, não um conjunto de blocos cinzas ou imagens estáticas.

**Detalhes econômicos:** cartazes repetíveis com variação, infiltrações por decal, canaletas, tubulações modulares, fios, mofo e detritos instanciados. Evitar milhares de objetos independentes com draw calls próprias.

### 11.2. Assets necessários

**Personagem:** Lia com rig humano e conjunto de animações para andar, correr, agachar, manusear lanterna, olhar por fresta, atravessar vãos, abrir portas e ser capturada.

**Criaturas:** Rastejante e Escriba com idle, patrulha, investigação, reação, perseguição, ataque e retorno. O Oco usa geometria/efeitos muito específicos, sem precisar de um monstro completo percorrendo cada sala.

**Ambientes modulares:** parede lisa, parede rachada, meia parede, porta com batente, porta metálica, canto interno/externo, piso, teto, corrimão, escada, tubulação, tubulação com bifurcação, canaleta e módulos de buraco em diferentes tamanhos.

**Objetos narrativos:** fita cassete, gravador, mapa/planta, disjuntor, válvulas, chave, lanterna, baterias, caixas de arquivo, interfone, armário, móveis e quadros.

**Formatos recomendados:** `.glb` para modelos, `.webp`/`.ktx2` para texturas quando possível, `.ogg`/`.mp3` para som compatível; licenças e autoria dos assets documentadas.

---

## 12. Som e atmosfera

O áudio é um sistema de informação jogável, não apenas decoração.

- Áudio espacial de batidas atrás da parede, respiração em shafts, vazamentos, motores, piso e portas.
- Camadas ambientais mudam ao entrar em setor, ficar parado, apagar lanterna, aproximar de uma abertura e ativar puzzles.
- A trilha musical é discreta; silêncio e pequenos ruídos devem carregar grande parte da tensão.
- **Save Room:** música original própria, suave e identificável; crossfade limpo ao entrar/sair, sem susto, sem sirenes, sem alteração enganosa.
- **Jumpscares:** áudio espacial e intensidade regulável; evitar picos que possam machucar ou incomodar e garantir que nenhuma música/efeito continue empilhando após carregar.
- Vozes falsas devem ser identificáveis por pistas posteriores, não por uma regra arbitrária de volume.
- Fones melhoram a experiência, mas legendas direcionais evitam impedir quem joga sem som.
- Ao interromper ou carregar cena, aplicar fades rápidos; nunca acumular instâncias de áudio gerando zumbido permanente.
- Respeitar desbloqueio de `AudioContext` após gesto do jogador; controles de volume separados (geral, efeitos, vozes e música).

---

## 13. HUD e interface

**Tela de jogo:** mínima. Mostrar apenas ícone discreto de lanterna/bateria quando necessário, indicação contextual de interação e legendas.

**Mapa:** planta arquitetônica descoberta progressivamente, com orientação coerente. Exibir salas, portas, vãos marcados pelo jogador, bloqueios e objetivos sem revelar automaticamente segredos.

**Menu principal:** `Novo jogo`, `Continuar`, `Capítulos (após desbloqueio)`, `Configurações`, `Créditos`.

**Pausa:** continuar, inventário, mapa, controles, acessibilidade, salvar (**somente ao interagir com gravador na Save Room**), sair para menu. Autosaves de checkpoints são independentes. O menu de pausa nunca gera um save manual remoto.

**Sem poluição visual:** evitar grandes painéis, emojis, minimapa persistente, marcadores luminosos em todas as portas e mensagens repetitivas.

---

## 14. Arquitetura Three.js sugerida

```text
vao-17/
├─ public/
│  ├─ assets/
│  │  ├─ characters/
│  │  ├─ creatures/
│  │  ├─ rooms/
│  │  ├─ props/
│  │  ├─ textures/
│  │  └─ audio/
│  └─ icons/
├─ src/
│  ├─ main.ts
│  ├─ core/
│  │  ├─ Game.ts
│  │  ├─ Renderer.ts
│  │  ├─ Input.ts
│  │  ├─ AssetManager.ts
│  │  └─ EventBus.ts
│  ├─ world/
│  │  ├─ World.ts
│  │  ├─ RoomManager.ts
│  │  ├─ RoomGraph.ts
│  │  ├─ DoorSystem.ts
│  │  ├─ HoleSystem.ts
│  │  ├─ CollisionWorld.ts
│  │  └─ InteractionSystem.ts
│  ├─ player/
│  │  ├─ PlayerController.ts
│  │  ├─ CameraController.ts
│  │  ├─ PlayerAnimator.ts
│  │  ├─ Flashlight.ts
│  │  └─ Inventory.ts
│  ├─ ai/
│  │  ├─ EnemyBrain.ts
│  │  ├─ Senses.ts
│  │  ├─ Navigation.ts
│  │  ├─ CrawlerAI.ts
│  │  └─ ScribeAI.ts
│  ├─ gameplay/
│  │  ├─ PuzzleSystem.ts
│  │  ├─ StoryFlags.ts
│  │  ├─ CheckpointSystem.ts
│  │  ├─ SafeRoomSystem.ts
│  │  ├─ ScareDirector.ts
│  │  └─ SaveManager.ts
│  ├─ chapters/
│  │  ├─ chapter1.ts
│  │  ├─ chapter2.ts
│  │  ├─ chapter3.ts
│  │  ├─ chapter4.ts
│  │  └─ chapter5.ts
│  ├─ data/
│  │  ├─ rooms.ts
│  │  ├─ interactions.ts
│  │  ├─ objectives.ts
│  │  ├─ safeRooms.ts
│  │  └─ scareEvents.ts
│  ├─ audio/
│  │  └─ AudioDirector.ts
│  ├─ ui/
│  │  ├─ HUD.ts
│  │  ├─ Menus.ts
│  │  └─ Journal.ts
│  └─ styles/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
```

### 14.1. Contratos de dados

Um setor contém `id`, `chapter`, `bounds`, `roomIds`, `neighbors`, `loadGroup`, `ambientAudio`, `lightingProfile` e `storyConditions`.

Cada sala contém `id`, `name`, `bounds`, `doorIds`, `holeIds`, `spawnPoints`, `interactables`, `stateFlags`, `visited`, `safeRoom` e, quando aplicável, `saveDeviceId`, `itemBoxId` e `safeMusicId`.

Cada porta contém `id`, `roomA`, `roomB`, `hingeOrSlide`, `open`, `locked`, `keyId`, `requiresPuzzle`, `collider`, `occlusion` e `persist`.

Um objetivo contém `id`, `prerequisites`, `trigger`, `completionCondition`, `completionFlags`, `onComplete` e `hintStages`.

**Não duplicar estados:** porta, abertura, puzzle e item precisam ter uma fonte de verdade no `WorldState`. Componentes visuais apenas espelham esse estado.

### 14.2. Construção e carregamento

- Usar uma `scene` principal, **setores e grupos lógicos**: mudar de sala não exige recriar toda a aplicação.
- Carregar o setor atual e vizinhos prováveis; carregar outros sob demanda com tela ou transição contextual somente quando realmente necessário.
- Ocultar renderização e reduzir atualizações de setores sem visibilidade; conservar flags e estados independentes das malhas.
- Criar grafo de portas/aberturas para localização, eventos sonoros, IA e navegação.
- Todo portal visual deve corresponder a uma conexão física ou a uma abertura intencionalmente fechada.
- `deltaTime` limitado para física/movimento; evitar atravessar parede após o navegador ficar em segundo plano.
- Descartar geometria, materiais, texturas e listeners de setores descarregados quando não compartilhados; centralizar recursos no `AssetManager`.

### 14.3. Colisão e movimento

- Personagem com cápsula, gravidade e resolução de colisão previsível.
- Colisores simplificados em paredes, chão, tetos e portas; modelos decorativos podem usar colisores próprios só se necessário.
- Portas mudam colisão após animação/estado validado, sem atravessar jogador e sem prendê-lo.
- Agachamento só permite levantar quando há espaço real acima da cabeça.
- Buracos rastejáveis têm volumes válidos e margem para tolerâncias; interpolar a cápsula ao entrar e sair.
- O inimigo deve ter a mesma noção de bloqueio e conexão do cenário que o jogador.
- Prevenir queda infinita: volumes de recuperação para erros com retorno ao último ponto seguro e registro de falha.

---

## 15. Otimização: PC e GitHub Pages

### 15.1. Metas iniciais de desempenho

- **PC intermediário:** buscar 60 FPS em 1080p após otimização e testes em hardware real.
- **Notebook e dispositivos modestos:** modo de qualidade reduzida visando 30 FPS estáveis.
- **Mobile:** meta futura, não prometer suporte antes de playtests reais.
- Tempo de carregamento, consumo de memória e número de draw calls devem ser medidos; não declarar que está otimizado só porque compila.

### 15.2. Estratégias

1. Setores curtos e conectados: reduzir objetos visíveis com oclusão por portas e corredores.
2. Mesclar geometrias estáticas compatíveis e usar `InstancedMesh` em objetos repetidos.
3. Limitar luzes que projetam sombras; bake quando possível; shadow-map adaptativo por qualidade.
4. Texturas comprimidas e mipmaps; manter detalhes altos em itens próximos, reduzir em setores distantes.
5. LOD de objetos e personagens em salas visíveis; no interior de corredores, **oclusão/culling vale mais que sprites gigantes**.
6. `GLB` real próximo; impostores/WebP só para objetos distantes que não afetam colisão, sombra crítica ou silhueta narrativa. Transição sem alterar a escala aparente.
7. Cache dos recursos compartilhados; descarregamento correto; streaming em pequenas partes.
8. Pó, neblina e partículas com quantidades limitadas e LOD; sem pós-processamento permanente de alto custo.
9. Desligar cálculos completos de IA em setores distantes; reativação determinística.
10. Criar menu `Baixo / Médio / Alto` para sombras, resolução interna, ambient occlusion e partículas.

### 15.3. Publicação e execução offline

- Configurar Vite com `base` compatível com o nome do repositório do GitHub Pages (ex.: `/Vao-17/`) e caminhos relativos aos recursos.
- Fazer deploy do **build de produção** (`dist`), não depender de servidor de desenvolvimento.
- O jogo não depende de banco de dados ou API para funcionar; saves são locais.
- Evitar `fetch` dinâmico com caminhos absolutos quebrados no Pages.
- O mesmo código pode mais adiante ser empacotado como aplicativo desktop com recursos locais. **Empacotar um site em EXE não o transforma automaticamente em motor 3D nativo**; se esse for o objetivo futuro, exigir planejamento separado.

---

## 16. Sequência de implementação

### P0 — Vertical slice completo: Capítulo I

**Prioridade máxima, nesta ordem:**

1. Estruturar projeto Vite + Three.js e tela inicial funcional; garantir build e Pages.
2. Criar o térreo com salas e corredores em escala humana, colisões e portas físicas.
3. Implementar Lia em terceira pessoa com rig/animações mínimas e pés plantados; depois câmera em primeira pessoa e troca V.
4. Implementar lanterna com feixe aberto/concentrado, bateria, dínamo e sombras adaptativas.
5. Criar interação com portas, armários, objetos, plantas e disjuntores.
6. Implementar primeiro buraco visível e atravessável, com alinhamento de câmera/cápsula e transição natural.
7. Criar puzzle P01 e objetivos totalmente executáveis.
8. Criar a **Save Room Zeladoria / Sala 03** com música exclusiva, luz fixa, gravador de fita, slots manuais, baú compartilhado e proibição comprovada de inimigos/sustos. Implementar áudio espacial, checkpoints de proteção, persistência e retorno entre salas.
9. Adicionar **JS01 (rosto no buraco)** e **JS06 (falso susto)** com animações distintas para 1ª/3ª pessoa, cooldown e flag persistente. Adicionar um encontro roteirizado sem combate e uma ameaça de teste com patrulha curta.
10. Executar o capítulo do portão até a escada com controles reais; corrigir falhas reproduzidas.

**Critério de pronto P0:** o jogador inicia do menu, escolhe a câmera, atravessa o térreo, usa a lanterna, resolve o quadro elétrico, atravessa o vão, volta a pelo menos duas salas, **salva manualmente na Zeladoria, sai, retorna, carrega em segurança**, encontra JS01/JS06, não repete susto já consumido e chega ao fim do capítulo sem travar.

### P1 — Sistemas de survival horror

- IA completa do Rastejante e Escriba, som e visão com oclusão.
- Implementar JS02–JS05, Diretor de Tensão adaptativo, reações de Lia, efeitos sonoros 3D, freios de repetição e opções de intensidade.
- Implementar segunda Save Room e baú compartilhado, testar zonas seguras/IA entre setores.
- Novo andar com apartamentos distintos, puzzles, atalhos e ameaças dosadas.
- Melhorias de animação, transições, controles, inventário e feedback.
- Testes automatizados de circulação, baterias, portas, rotas e saves.

### P2 — Campanha completa

- Subsolo, ala acústica e Vão 17.
- Ramificações narrativas e três finais.
- Polimento de iluminação, som, performance, acessibilidade e mapas.
- Certificação de campanha inteira em ambas as perspectivas.

### P3 — Pós-lançamento

- Gamepad refinado, tradução, opções extras de acessibilidade.
- Modo mobile apenas se desempenho e controles forem satisfatórios.
- Empacotamento desktop offline, se desejado, com análise de custo/benefício.

---

## 17. QA, testes e critérios de aceite

### 17.1. Testes obrigatórios

| Área | Caso reproduzível | Aceite |
|---|---|---|
| Inicialização | Abrir build no caminho real do Pages | Menu e assets carregam, sem 404 nem erros fatais |
| Primeira pessoa | Passar por portas, agachar e virar em corredor estreito | Sem clipping grave de cabeça/lanterna |
| Terceira pessoa | Encostar em paredes e atravessar vão | Câmera aproxima e recua sem atravessar paredes |
| Perspectiva | Trocar V durante caminhada e após interação | Mesmo estado e direção de movimento coerente |
| Lanterna | Alternar modos, gastar bateria, desligar, dínamo | Luz real e estados corretos, sem softlock |
| Porta | Abrir, fechar, trancar, salvar, recarregar | Estado e colisão sincronizados |
| Buraco | Espiar, alcançar, rastejar e voltar | Malhas e colisores permitem passagem legítima |
| Puzzle | P01 concluído e recarregado | Objetivo e porta persistentes |
| Inimigo | Fechar porta durante busca | Visão e navegação respeitam bloqueio |
| Backtracking | Voltar após coletar item | Item não reaparece; sala não reinicia arbitrariamente |
| Save Room | Entrar perseguido, fechar porta, salvar e reorganizar baú | Inimigo não atravessa, nenhum dano/jumpscare no interior e música limpa |
| Save | Salvar na Zeladoria, sair, fechar o navegador e carregar | Nasce dentro de sala segura com posição/câmera válidas e sem inimigo na soleira |
| Jumpscare JS01 | Iluminar o buraco em 1ª e 3ª pessoa, salvar após | Rosto tem origem física; reação correta; flag impede repetição no retorno |
| Jumpscare JS02–JS05 | Acionar por condições narrativas e validar rota | Visão/oclusão corretas; nenhum ataque injusto; duas câmeras funcionais |
| Jumpscare JS06 | Investigar som falso e revisitar após evento desbloqueador | Sem spawn arbitrário; variação contextual sem repetição automática |
| Diretor de Tensão | Fazer sequência de sustos, entrar na Save Room, carregar e sair | Cooldown, recuperação e imunidade de saída respeitados |
| Acessibilidade do susto | Alternar suave/padrão/intensa e reduzir efeitos | Progressão idêntica, efeitos opcionais respeitados |
| Áudio | Pausar, voltar e trocar de setor | Sem faixas duplicadas, volume acumulado ou zumbido |
| Performance | Caminhar por toda a área com telemetria | Sem vazamento crescente e sem quedas recorrentes inexplicadas |

### 17.2. Telemetria de desenvolvimento

Registrar em modo QA: sala atual, posição, setor carregado, FPS, draw calls, triângulos, memória aproximada disponível, estado da câmera, bateria, flags, colisor tocado, eventos de portas, percepção da IA e erros de asset.

Criar atalho de QA para ir a marcos específicos **apenas em builds de teste**; jamais mascarar o fluxo real de capítulos com teleportes de desenvolvimento.

### 17.3. Testes de campanha

- **Smoke test** automático: menu → portaria → recepção → quadro elétrico → depósito → vão → escada.
- **Regressão:** repetir em primeira e terceira pessoa.
- **Persistência:** salvar, fechar, abrir e retornar; conferir portas, objetos, baterias, puzzles, baú compartilhado, histórico de sustos e cooldown.
- **Safe Room inviolável:** simular perseguição, luz apagada, pausa, reload e backtracking em cada sala segura; nenhum evento hostil é permitido.
- **Jumpscares e replay:** testar seis variantes nas duas câmeras, gatilhos não válidos, acessibilidade e o mesmo ponto após recarregar um save posterior.
- **Campanha completa:** somente declarar capítulos finalizados depois de percorrê-los integralmente em build de produção.
- **Evidência:** logs, capturas dos estados críticos e relatório de testes realmente executados. Não confundir especificação de teste com teste já aprovado.

---

## 18. Riscos e prevenção

| Risco | Solução prioritária |
|---|---|
| Câmera sobre o ombro atravessa parede | Sphere cast + encurtamento inteligente + centralização em corredor estreito |
| Braço da lanterna aponta errado | Mesmo alvo/look vector para IK do braço e SpotLight; testes de animação |
| Corredores parecem cópias | Planta pré-definida, marcos visuais e paleta distinta por setor |
| Inimigo atravessa porta | Navegação associada ao estado real de portas e colisores |
| Jogador fica sem luz e sem saída | Dínamo, pistas alternativas e reservas garantidas |
| Backtracking respawna itens/criaturas | WorldState persistente separado do carregamento 3D |
| Susto se repete a cada retorno ou save | Flags de eventos e cooldown persistentes; seleção por Diretor de Tensão |
| Inimigos invadem a Save Room | Filtro `safeRoom` no grafo de navegação, testes de fronteira e zona protegida |
| Save quebra a tensão ou gera softlock | Salvamento manual físico + checkpoints limitados de proteção; restores testados |
| Muitos lights derrubam FPS | Shadow budget, bake, emissivos e perfis de qualidade |
| Loading quebra a imersão | Pré-carregar setores conectados e manter conexões físicas |
| Jogo parece demo sem história | Cada área com objetivo, mudança de estado e revelação narrativa |
| GitHub Pages dá 404 | Base path, build de produção e validação de URLs dos assets |

---

## 19. Prompt operacional para implementar este MD com IA de programação

> **Papel:** atue como engenheiro principal de jogos Three.js e diretor técnico de survival horror. Implemente **FRESTA — O LADO DE DENTRO** seguindo este GDD como fonte de verdade. Comece pelo estado real do repositório, preserve o que estiver funcionando e avance por P0 → P1 → P2. Não simule funcionalidades com textos ou telas falsas. Construa salas, corredores, portas, colisões, buracos navegáveis, duas câmeras, lanterna física, interações, puzzles, estados persistentes, **Save Rooms invioláveis com gravador e baú compartilhado**, seis famílias de jumpscares físicos e um Diretor de Tensão verificável. Priorize a conclusão real do Capítulo I antes de criar mapas adicionais.
>
> **Qualidade:** corrigir antes de ampliar. Animações humanas, pés no chão, mãos orientadas corretamente à lanterna, colisão real em portas e paredes, câmera de terceira pessoa que não clipa, primeira pessoa fluida, áudio sem instâncias duplicadas, puzzles concluíveis e saves sem estados impossíveis.
>
> **Publicação:** manter build funcional no GitHub Pages. Ao modificar código, executar build e testes disponíveis; quando houver navegador de QA, percorrer o trecho jogável e registrar evidências. Não declarar testes que não foram executados.
>
> **Relatório obrigatório por entrega:** 1) estado anterior; 2) alterações em arquivos; 3) bugs reproduzidos e corrigidos; 4) testes executados e resultados; 5) desempenho observado; 6) pendências P0/P1/P2; 7) link/commit somente quando publicação confirmada.
>
> **Ao receber “próxima”:** executar o próximo item de maior impacto, sem pedir autorização novamente, desde que a ferramenta tenha acesso e permissões necessárias.

---

## 20. Resumo da primeira versão jogável

A primeira entrega não deve ser apenas uma caminhada em cenário escuro. Ela deverá incluir, no mínimo:

- [ ] Menu e jogo iniciando normalmente no navegador.
- [ ] Térreo completo com portaria, recepção, corredor, 4–5 salas úteis, portas e escada final.
- [ ] Personagem animada em 1ª/3ª pessoa, sem atravessar paredes.
- [ ] Lanterna com consumo, foco e dínamo.
- [ ] Um buraco para espiar e um buraco realmente atravessável.
- [ ] Um puzzle de energia que destrava a progressão.
- [ ] Sons posicionais, JS01 (rosto no buraco) e JS06 (falso susto) com efeitos/reações adequados nas duas câmeras.
- [ ] Zeladoria / Sala 03 funcionando como Save Room inviolável, música ambiente, fita de save e baú compartilhado.
- [ ] Cooldown de sustos, eventos consumidos, dados persistentes e ausência de ataques após carregamento.
- [ ] Um inimigo ou evento de ameaça com regra clara de evasão.
- [ ] Voltar por salas sem resetar o mundo.
- [ ] Save manual na sala segura, load, checkpoint de proteção, pausa, configurações de imagem/áudio/acessibilidade e fim do capítulo.
- [ ] Build de produção publicado e percorrido em QA.

**Visão final:** um survival horror de espaços compactos, memoráveis e interligados, no qual cada porta, buraco e facho de luz conta parte da história. O jogador deve temer sobretudo aquilo que consegue ouvir — mas ainda não consegue enxergar — do outro lado das paredes.
