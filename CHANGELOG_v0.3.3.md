# FRESTA 66 — v0.3.3

## Correções verificadas por testes de código
- Paredes de perímetro da escadaria com altura completa (6,24 m) no térreo, sem fechar o acesso original.
- Interações em pisos elevados calculam linha de visão a partir da altura real da câmera.
- Bloqueio de interações em pavimentos com distância vertical incompatível.
- Passos usam posição sonora elevada.
- Arquivo JS com nome novo para evitar cache da versão anterior.
- Testes automatizados de recursos, subida, estrutura, interação e fechamento de documentos.

## Limites
- O teste visual jogando com WebGL não foi realizado: navegador local bloqueado.
- O deslocamento ainda usa colisões 2D com elevação visual na escadaria; colisão volumétrica completa é uma evolução futura.
- Permanece recomendada revisão de iluminação, backtracking, salvamento e cenários em ambos os capítulos.
