# FRESTA 66 — revisão 0.3.5

## Correções
- Corrigido retorno de posições inválidas: agora x, z e feetY são restaurados juntos.
- Salvaguarda contra altura vertical desatualizada quando o personagem é bloqueado pelos limites da cena.
- Adicionada ponte de diagnóstico apenas para `localhost` / `127.0.0.1` com `?qa=1`; indisponível no GitHub Pages público.

## QA acrescentado
- GitHub Actions passa a verificar a inicialização real no Chromium com WebGL, o desenho de geometria, o percurso dos dois lances, passagem do capítulo I ao II, retorno, restauração do checkpoint e fechamento dos documentos.
- Os testes de integração rodam com Playwright no próprio runner do GitHub; não alteram saves de jogadores.
- Novos testes de regressão local para rollback de altura, ponte local de QA e versão.

## Limitações
- O navegador deste ambiente bloqueou páginas locais; a certificação WebGL só poderá ser afirmada se o job `browser-smoke` do GitHub Actions concluir com sucesso.
- A IA dos inimigos em percursos de backtracking longos e os efeitos de iluminação ainda precisam de sessões completas de playtest.
