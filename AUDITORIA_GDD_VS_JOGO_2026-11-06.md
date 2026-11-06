# FRESTA — Auditoria GDD x versão publicada (06/11/2026)

**Referência principal:** `FRESTA_GDD_THREEJS.md` (v1.2). **Código auditado:** build distribuído 0.7.0, `index.html` e bundle ativo `assets/index-C-oLyjfl.js`.

## Resultado por funcionalidade

| Item do GDD | Resultado no código | Evidência / pendência |
| --- | --- | --- |
| Cinco capítulos I–V | Presente | Layouts, objetos e transições codificados; não equivale a playtest integral WebGL |
| Primeira e terceira pessoa | Presente | Estado `camera`, modos first/third, controles; câmera em corredor estreito ainda requer playtest |
| Lanterna e dínamo | Presente | Controles, bateria e modelo GLB da lanterna |
| Portas, interação e buracos | Presente | Aberturas, colisores, flags, interação e crouch |
| Quatro Save Rooms | Presente | Zeladoria, copa 204, Arquivo Técnico e Observação; proteção programada; teste humano pendente |
| Três slots, baú e checkpoints | Presente | Armazenamento e estado de jogo no bundle; compatibilidade anterior requer regressão |
| Puzzles P01–P05 e três finais | Presente | Rotas programadas; completude e clareza visual exigem testes |
| JS01 — rosto no buraco | Presente | Geometria/áudio de susto e evento persistente |
| JS02 — aparição no corredor | Parcial | Figura aparece, mas falha da lanterna e consequência investigável do GDD não foram confirmadas |
| **JS03 — mão pela porta** | **Restaurado nesta auditoria** | Gatilho na primeira abertura elegível da porta de manutenção; mão 3D simples, áudio espacial, reação e evento persistente |
| JS04 — espelho | Presente | Figura renderizada na camada de reflexão |
| JS05 — ruptura da parede | Parcial | Evento, som, rota alternativa e choque programados; animação física de ruptura/partículas não confirmada |
| JS06 — falso susto | Parcial | Objeto cai no corredor, evento não se repete; revisita contextual diferenciada não confirmada |
| Diretor de Tensão | Parcial | Estados CALM/UNEASE/PRESSURE/PEAK/RECOVERY e cooldown, mas não foi confirmado escalonamento completo por seed/visitas |
| IA e monstros | Parcial | IA por estados, visão e perseguição; **não há GLB do Rastejante nem do Escriba no repositório publicado** |
| Lia e animações humanas | Parcial | Personagem procedural; rig e conjunto completo de animações autorais do GDD ausentes/não comprovados |
| Áudio ambiental | Parcial | Síntese Web Audio e sons espaciais; assets de vozes/trilha originais não encontrados na árvore |
| Menus e acessibilidade | Parcial/presente | Configurações de câmera, qualidade e intensidade; certificação de todas as opções pendente |
| Performance | Parcial | Escala adaptativa e limites de FPS; métricas em GPU real ainda não certificadas |
| Fonte editável | **Ausente da raiz do repositório** | Contém bundle de distribuição e testes, mas não `src/`, `package.json` ou projeto Vite completo |

## Correção desta revisão — JS03

A porta `maintenanceDoor` (Capítulo I) recebe o evento somente depois da abertura bem-sucedida, fora de Save Room e fora do período de proteção, respeitando a trava elétrica e a janela do Diretor de Tensão. O evento registra `JS03` em `state.events`, usa uma mão geométrica 3D temporária e legenda direcional. Reabrir a porta depois do susto não o repete. Este visual é um **placeholder funcional**, não o modelo final com rig de mão e dedos articulados previsto no GDD.

## P0 — prioridade de próximas correções

1. Recuperar o projeto-fonte do jogo em `src/` e os assets originais; o bundle minificado é um artefato de publicação, não uma base adequada para evolução contínua.
2. Integrar os GLB reais do Rastejante e do Escriba, com normalização de escala, pivot, materiais e animação; manter fallback visual se o modelo não carregar. O arquivo de Rastejante enviado em outra conversa não faz parte desta árvore do GitHub.
3. Reproduzir no Chromium/PC com WebGL 2: carregar, atravessar os cinco capítulos nas duas câmeras, testar escada, frestas, portas, checkpoints, finais, JS01–JS06 e carregamento de save.
4. Certificar que o save e o baú permanecem válidos ao voltar por escadas e capítulos; preservar compatibilidade com saves antigos.
5. Completar os seis sustos em apresentação 3D e o Diretor de Tensão sem violar Save Rooms.

## P1 — coerência e acabamento

- Aprimorar a figura e a animação do JS03, com braço saindo de uma fresta física na malha da porta.
- Finalizar falha contextual da lanterna e pista do JS02, detritos/ruptura visual do JS05 e segunda visita contextual do JS06.
- Adicionar áudio, material e animadores dos inimigos; revisar controles da câmera no vão e escadaria.
- Completar GDD com uma matriz de aceitação funcional e diferenciais entre **planejado**, **implementado**, **testado** e **publicado**.

## Evidência e limitações

Inspeção estática realizada no repositório via GitHub e leitura da versão HTML pública. A revisão JS03 foi **gravada no código do GitHub**; os testes de código foram adicionados, mas **não foram executados em Node/Chromium nesta sessão**. O ambiente não dispõe de WebGL para afirmar que o jogo foi inteiramente percorrido nem para medir FPS. A publicação do GitHub Pages e a invalidação de cache ainda precisam ser verificadas antes de declarar correção visível ao jogador. Não confundir testes descritos no arquivo LEIA-ME com testes reproduzidos nesta auditoria.
