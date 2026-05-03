#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  start-dev.sh — Levanta Back (Express) y Front (Vite) juntos
#  Uso:  ./start-dev.sh          (inicia ambos)
#        ./start-dev.sh --back   (solo backend)
#        ./start-dev.sh --front  (solo frontend)
# ─────────────────────────────────────────────────────────────

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

cleanup() {
    echo ""
    echo -e "${YELLOW}⏹  Deteniendo servidores...${NC}"
    kill $BACK_PID $FRONT_PID 2>/dev/null
    wait $BACK_PID $FRONT_PID 2>/dev/null
    echo -e "${GREEN}✔  Servidores detenidos.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

run_back() {
    echo -e "${CYAN}🚀 Iniciando Backend (Express)...${NC}"
    cd "$ROOT_DIR/Back" && npm run dev &
    BACK_PID=$!
}

run_front() {
    echo -e "${CYAN}🚀 Iniciando Frontend (Vite)...${NC}"
    cd "$ROOT_DIR/Front" && npm run dev &
    FRONT_PID=$!
}

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   JAFFA CoWork — Entorno de Desarrollo ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
echo ""

case "${1}" in
    --back)
        run_back
        ;;
    --front)
        run_front
        ;;
    *)
        run_back
        sleep 2
        run_front
        ;;
esac

echo ""
echo -e "${GREEN}✔  Backend:  ${NC}http://localhost:3000"
echo -e "${GREEN}✔  Frontend: ${NC}http://localhost:5173"
echo -e "${YELLOW}   Presiona Ctrl+C para detener ambos.${NC}"
echo ""

wait
