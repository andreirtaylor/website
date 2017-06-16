
Vue.component('indexed-tbl', {
  props: ['arr', 'title'],
  template: `
      <div>
        <h2>{{title}}</h2>
        <table class="table">
          <thead>
            <tr>
              <th v-for="(val, index) in arr">
                {{index}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th v-for="val in arr">
                {{ val }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
`
});
Vue.component('queen', {
  props: ['ison'],
  template: `
    <div >
      <img height="50px" width="50px"
        class="img-responsive"
        src="https://openclipart.org/download/275291/3_Silueta_Dama_Negra_by_DG-RA.svg"
        v-if="ison == 1"/>
      <img
        height="50px" width="50px"
        class="img-responsive" style="opacity:0"
        src="https://openclipart.org/download/275291/3_Silueta_Dama_Negra_by_DG-RA.svg"
        v-else>
    </div>
  `
});

Vue.component('game-board', {
  props: ['arr'],
  template: `
    <div class="container-fluid">
      <div class="col-md-8 offset-md-2 col-lg-6 col-lg-offset-3">
        <table class="table">
          <tbody>
            <tr v-for="row in arr">
              <td v-for="cell in row">
                <queen v-bind:ison=cell>
                </queen>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
`
});



var vm = new Vue({
  el: '#n-queens',
  data: {
    seen: true,
    rows: [],
    cols: [],
    down_diag: [],
    up_diag: [],
    N: 8,
    game_board: [[]],
    solutions: 0,
    run: null,
  },
  methods: {
    push_n: function (arr, n){
      // remove all of the things from the array
      arr.splice(0);
      for(let i = 0; i < n; ++i){
        arr.push(0);
      }
    },
    get_solution: function(){
      while(this.run.next().value == 0){
      }
    },
    solve: function(){
      while(!this.run.next().done){
      }
    },
    reset: function () {
      this.solutions = 0;
      this.push_n(this.rows, this.N);
      this.cols = new Array(this.N).fill(0);
      this.down_diag = new Array(this.N*2).fill(0);
      this.up_diag = new Array(this.N*2).fill(0);
      this.game_board = [];
      for(let i = 0; i < this.N; ++i){
        this.game_board.push(new Array(this.N).fill(0));
      }

      this.run = gen_next()
    },
  },
  created: function () {
    this.reset()
  },
})

function * gen_next(){
  yield* N_Queens(0);
}

function * N_Queens(col){
  if(col >= vm.N) yield ++vm.solutions;
  for(let row = 0; row < vm.N; ++row){
    if(set_value(row, col)){
      yield 0;
      yield* N_Queens(col+1);
      unset_value(row, col);
    };
  }
}

function unset_value(row, col){
  // if any of the moves are invalid
  Vue.set(vm.down_diag, row-col + vm.N, 0);
  Vue.set(vm.up_diag, row+col, 0);
  Vue.set(vm.rows, row, 0);
  Vue.set(vm.cols, col, 0);
  Vue.set(vm.game_board[row], col, 0);
}
function set_value(row, col){
  // if any of the moves are invalid
  if( vm.down_diag[row-col + vm.N] ||
    vm.up_diag[row+col] ||
    vm.rows[row] ||
    vm.cols[col])
      return false;

  console.log(row + col, vm.N)
  Vue.set(vm.down_diag, row-col + vm.N, 1);
  Vue.set(vm.up_diag, row+col, 1);
  Vue.set(vm.rows, row, 1);
  Vue.set(vm.cols, col, 1);
  Vue.set(vm.game_board[row], col, 1);
  return true;
}
