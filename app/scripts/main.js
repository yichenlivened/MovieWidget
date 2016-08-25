new Vue({
  el: '#app',
  data: {
    cardTitle: 'In Theaters',
    cardSub: 'Top Movies This Week',
    movies: []
  },

// Anything within the ready function will run when the application loads
  ready: function() {
    // When the application loads, we want to call the method that initializes
    // some data
    this.fetchEvents();
  },

// Methods we want to use in our application are registered here
  methods: {

    // We dedicate a method to retrieving and setting some data
    fetchEvents: function() {
      var self = this;
      var movies;
      //request link
      var myHeaders = new Headers();
      var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=5&country=us&apikey=6czx2pst57j3g47cvq9erte5';
      var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };
      var myRequest = new Request(url, myInit);

      //fetch movies list
      fetch(myRequest).then(function(res) {
        return res.json();
      }).then(function(data){
        movies = data.movies.map(function(movie){
          return {
            title: movie.title,
            synopsis: movie.synopsis.substr(0, 110) + '...',
            poster: movie.posters.profile,
            rating: Math.round(movie.ratings.audience_score/20)
          }
        });
        console.log(movies);
        self.$set('movies', movies);
      }).catch(function(error) {
        console.log(error);
      });

    },

    // Adds an event to the existing events array
    addEvent: function() {
      if(this.event.name) {
        this.events.push(this.event);
        this.event = { name: '', description: '', date: '' };
      }
    }
  }
});

$('.carousel').carousel({
  interval: false
});
