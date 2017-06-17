Vue.component('tbl-cell', {
  props: ['val', 'ind', 'hover'],
  template: `
      <td v-bind:style="{'background-color':hover}"  v-on:mouseleave="leave" v-on:mouseenter="send" v-bind:class="{ 'bg-primary': val }"></td>
`,
  methods: {
    send: function(){
      this.$emit('hovered', { val: this.ind })
    },
    leave: function(){
      this.$emit('leave')
    }
  }
});

Vue.component('indexed-tbl', {
  props: ['arr', 'title', 'decl'],
  template: `
  <div class="container-fluid">
    <div class="col-sm-2">
      <h3>{{title}}</h3>
    </div>
    <div class="col-sm-10">
      <table class="table table-striped">
        <thead>
          <tr>
            <th v-for="(val, index) in arr">
              <span v-if="decl">
                  {{index + 1- ((arr.length + 1) /2)}}
              </span>
              <span v-else>
                {{index}}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <tbl-cell :key="ind" @leave="leave" @hovered="poop" v-bind:ind="ind" v-bind:hover="item.hover" v-bind:val="item.val" v-for="(item, ind) in arr"></tbl-cell>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`
  , methods: {
    poop: function(arg){
      this.$emit("hovered", arg)
    },
    leave: function(arg){
      this.$emit("leave", arg)
    },
  }
});

Vue.component('queen', {
  props: ['ison', 'row', 'col'],
  template: `
    <div v-on:mouseleave="leave" v-on:mouseenter="send">
      <img height="50px" width="50px"
        class="img-responsive center-block"
        src="https://openclipart.org/download/275291/3_Silueta_Dama_Negra_by_DG-RA.svg"
        v-if="ison == 1"/>
      <img
        height="50px" width="50px"
        class="img-responsive center-block" style="opacity:0"
        src="https://openclipart.org/download/275291/3_Silueta_Dama_Negra_by_DG-RA.svg"
        v-else>
    </div>
  `
  , methods: {
    send: function(){
      this.$emit('queenhover', { row: this.row, col: this.col })
    },
    leave: function(){
      this.$emit("leave")
    }
  }
});

Vue.component('game-board', {
  props: ['arr'],
  template: `
    <div class="container-fluid">
      <div class="col-md-8 offset-md-2 col-lg-6 col-lg-offset-3">
        <table class="table table-bordered table-active">
          <tbody>
            <tr v-for="(row, r_ind) in arr">
              <td v-for="(cell, c_ind) in row" style="padding:0; margin:0" @mouseenter="">
                <div v-if="(r_ind % 2 && c_ind % 2) || !(r_ind % 2) && (c_ind + 1) % 2" >
                  <queen @queenhover="passup" v-bind:col=c_ind v-bind:row=r_ind   v-bind:highlight="cell.highlight" v-bind:ison="cell.val" v-bind:style="{'background-color':cell.highlight || 'grey'}">
                  </queen>
                </div>
                <div v-else >
                  <queen @leave="leave" @queenhover="passup" v-bind:col=c_ind v-bind:row=r_ind v-bind:style="{'background-color':cell.highlight}"v-bind:ison="cell.val">
                  </queen>
                </div>
              </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
`
  , methods: {
    passup: function(arg){
      this.$emit("queenhover", arg)
    },
    leave: function(){
      this.$emit("leave");
    }
  }
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
    tries: 0,
    up_color: "red",
    down_color: "green",
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
      this.cols = new Array(this.N).fill({ val: 0 });
      this.down_diag = new Array(this.N*2 - 1).fill({ val: 0 });
      this.up_diag = new Array(this.N*2 -1).fill({ val: 0 });
      this.game_board = [];
      for(let i = 0; i < this.N; ++i){
        this.game_board.push(new Array(this.N).fill({ val: 0 }));
      }

      this.run = gen_next()
      this.tries = 0
    },
    get_decline: function(from){
      this.clear_highlights();
      this.draw_decline(from);
      let curr_val = this.down_diag[from.val];
      Vue.set(this.down_diag, from.val, {val: curr_val.val, hover: this.up_color});
    },
    draw_decline: function(from){
      let row = 0, col = this.N - from.val;
      if(from.val >= this.N){
        row = from.val % (this.N), col = 0;
      }
      while(row < this.N && col < this.N){
        let val = this.game_board[row][col].val;
        Vue.set(vm.game_board[row], col, { highlight: this.down_color, val: val});
        row++; col++;
      }
    },
    get_incline: function(from){
      this.clear_highlights();
      this.draw_incline(from);
      let curr_val = this.up_diag[from.val];
      Vue.set(this.up_diag, from.val, {val: curr_val.val, hover: this.up_color});
    },
    draw_incline: function(from){
      let row = from.val, col = 0;
      if(from.val >= this.N){
        // need to handle the case of this being the last diagonal
        row = this.N - 1 , col = ((from.val == this.N * 2 - 2)? this.N - 1 : from.val % (this.N - 1));
      }
      while(row >= 0 && col < this.N){
        let val = this.game_board[row][col].val;
        Vue.set(vm.game_board[row], col, { highlight: this.up_color,  val: val});
        row--; col++;
      }
    },
    clear_highlights:function(){
      //this.up_diag.forEach(function(val){ 
      //  delete val.hover; })
      //this.down_diag.forEach(function(val){ 
      //  delete val.hover; })
      for(let i = 0; i < this.N * 2 - 1; ++i){
        let curr_down = this.down_diag[i];
        Vue.set(this.down_diag, i, {val: curr_down.val});
        let curr_up = this.up_diag[i];
        Vue.set(this.up_diag, i, {val: curr_up.val});
      }
      for(let row = 0; row < this.N; ++row){
        for(let col = 0; col < this.N; ++col){
          let val = this.game_board[row][col].val;
          Vue.set(vm.game_board[row], col, { val: val});
        }
      }
    },
    queen_hover:function(arg){
      this.clear_highlights();
      if ((arg.row == 0 && arg.col == 0) || (arg.row == this.N -1 && arg.col == this.N -1) ){
        this.draw_decline({val:arg.row - arg.col + this.N});
        this.draw_incline({val:arg.row + arg.col});
      } else {
        this.draw_incline({val:arg.row + arg.col});
        this.draw_decline({val:arg.row - arg.col + this.N});
      }
      this.up_diag[arg.row + arg.col].hover = this.up_color;
      this.down_diag[arg.row - arg.col + (this.N - 1)].hover = this.down_color;
    }
  },
  created: function () {
    this.reset()
  },
})

function * gen_next(){
  yield* N_Queens(0);
}

function * N_Queens(col){
  if(col >= vm.N){
    yield ++vm.solutions;
    return;
  }
  for(let row = 0; row < vm.N; ++row){
    vm.tries++
    if(set_value(row, col)){
      yield 0;
      yield* N_Queens(col+1);
      unset_value(row, col);
    };
  }
}

function unset_value(row, col){
  // if any of the moves are invalid
  Vue.set(vm.down_diag, row-col + (vm.N - 1), {val: 0});
  Vue.set(vm.up_diag, row+col, {val: 0});
  Vue.set(vm.rows, row, {val: 0});
  Vue.set(vm.cols, col, {val: 0});
  Vue.set(vm.game_board[row], col, {val: 0});
}
function set_value(row, col){
  // if any of the moves are invalid
  if( vm.down_diag[row-col + (vm.N - 1)].val ||
    vm.up_diag[row+col].val ||
    vm.rows[row].val ||
    vm.cols[col].val)
      return false;


  Vue.set(vm.down_diag, row-col + (vm.N - 1), {val: 1});
  Vue.set(vm.up_diag, row+col, {val: 1});
  Vue.set(vm.rows, row, {val: 1});
  Vue.set(vm.cols, col, {val: 1});
  Vue.set(vm.game_board[row], col, {val: 1});
  return true;
}
