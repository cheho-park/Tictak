/* --- JavaScript --- */
// 게임 상태 배열, 현재 플레이어, 게임 활성 여부 변수 선언
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // X부터 시작
let gameActive = true;
// 승리 조건 배열 (세 칸 연속 체크)
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// DOM 요소 선택
const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("reset");

// 셀 클릭 이벤트 핸들러
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  // 이미 채워졌거나 게임이 종료되었으면 동작하지 않음
  if (board[index] !== "" || !gameActive) return;

  // 현재 플레이어의 기호를 배열과 화면에 기록
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // 승리 검사 후, 승리 시 메시지 출력하고 게임 종료
  if (checkWin()) {
    messageElement.textContent = "플레이어 " + currentPlayer + " 승리!";
    gameActive = false;
    return;
  }

  // 모든 셀이 채워졌으면 무승부 처리
  if (!board.includes("")) {
    messageElement.textContent = "무승부!";
    gameActive = false;
    return;
  }

  // 플레이어 전환 (X ↔ O)
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = "플레이어 " + currentPlayer + " 차례";
}

// 승리 조건 체크 함수
function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// 게임 초기화 함수
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  messageElement.textContent = "플레이어 " + currentPlayer + " 차례";
  cells.forEach((cell) => (cell.textContent = ""));
}

// 각 셀에 클릭 이벤트 리스너 추가
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
// 리셋 버튼에 클릭 이벤트 리스너 추가
resetButton.addEventListener("click", resetGame);

// 초기 메시지 설정
messageElement.textContent = "플레이어 " + currentPlayer + " 차례";
