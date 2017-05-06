const help = {
  template: `
		<div class="row help">
      <div class="small-12 columns">
        <h1>Help</h1>
        <hr />
        
<p>        
The app presents an image divided into 16 equal pieces enumerated from left to right, top to bottom. The last 16th piece is missing.
When the user hits “Start” the pieces are scrambled and the time counter starts counting until the user (using the arrow buttons) correctly rearranges the puzzle back to the initial state.
Check Wiki for more detailed game info https://en.wikipedia.org/wiki/15_puzzle 
</p>
<p>
Additionally the user can go to another page which presents the leader board (that is 10 shortest games), the leader board also has a button to go back to the game page.
Note! Using canvas for the scrambled image beats the purpose of this exercise.
</p>

<p>
Bonus:
<p>
<ul> 
<ol>Use of one of the popular frameworks – React/Angular/Backbone/etc..</ol>
<ol>Use of swipe gestures, responsive design and in general the app should work on mobile devices</ol>
<ol>Use of Bower or any other package manager</ol>
<ol>Use of the local storage for the results</ol>
<ol>Use key strokes (up down left right)</ol>
<ol>Use CSS animation</ol>
<ol>Make it possible to set the game board dimensions</ol>
<ol>Present your solution as a git project</ol>
</ul>

<p>
You are allowed to use any frameworks, libraries or modules.        
</p>
     
      </div>
		</div>
	`
};

export default help;
