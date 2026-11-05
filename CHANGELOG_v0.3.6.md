# FRESTA 66 — v0.3.6 · correção do patamar superior

A primeira execução de gameplay no Chromium revelou que a colisão invisível da parede frontal, criada em Z=34.25, interrompia a movimentação em Z≈34.61.

- Alinhei o bloqueio em Z=34.06, exatamente onde está a parede geométrica visível.
- O personagem pode chegar ao patamar Z=34.48 sem atravessar a parede frontal.
- Mantida a proteção contra saltos entre os lances e passagem por baixo da escada.
- Novo nome do arquivo JavaScript para forçar atualização no GitHub Pages.
- Testes automatizados agora verificam que a barreira coincide com a parede visível.

A renderização WebGL no Chromium foi confirmada na execução anterior. A certificação completa do percurso e backtracking depende do novo workflow.
