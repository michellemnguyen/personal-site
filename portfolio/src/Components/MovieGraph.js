import React, { Component } from 'react';
import * as d3 from 'd3';
import firebase from '../firebase'

class MovieGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nodes: [],
            links: []            
        }

        this.chart = this.chart.bind(this);
        this.actorExists = this.actorExists.bind(this);
    }

    componentDidMount() {

        let currentComponent = this;

        // load movies to display into state
        firebase.database().ref('/movieList/GraphViz/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(grandSnapshot) {
                    var movieObject = grandSnapshot.val();

                    // create object with data
                    let newMovie = {
                        type: 0,
                        name: movieObject.title,
                        poster: movieObject.poster,
                        actors: movieObject.actors
                    }

                    // add movie and its actors as new node
                    if (newMovie.name !== undefined) {

                        // create new movie node
                        currentComponent.setState(prevState => ({
                            nodes: [...prevState.nodes, newMovie]
                        }))

                        // iterate through new movie's actors
                        let newActors = movieObject.actors;
                        let newActorsList = newActors.split(', ');
                        newActorsList.forEach(a => {
                            
                            let newActor = {
                                type: 1,
                                name: a
                            }
                            
                            // if not already a node, add into nodes
                            if (!currentComponent.actorExists(newActor)) {
                                console.log('new actor', newActor)
                                currentComponent.setState(prevState => ({
                                    nodes: [...prevState.nodes, newActor]
                                }))
                            }

                            console.log('creating link between ' + newMovie.name + ' & ' + newActor.name)

                            // create a link between the movie and the actor
                            let newLink = {
                                source: currentComponent.state.nodes.indexOf(newMovie),
                                target: currentComponent.state.nodes.map(function(n) { return n.name; }).indexOf(newActor.name)
                            }

                            // add link to state.links
                            currentComponent.setState(prevState => ({
                                links: [...prevState.links, newLink]
                            }))
                        });

                    }                        
                });
              });
        });        
    }

    actorExists(actor) {
        let actorName = actor.name
        console.log('name checking', actorName)
        let allActors = this.state.nodes.filter(n => n.type === 1)
        console.log('all actors', allActors)
        let hasActor = allActors.some(actorObj => actorObj.name.indexOf(actorName) > -1);
        console.log('has actor', hasActor)
        return hasActor
    }

    componentDidUpdate() {

        console.log('nodes:', this.state.nodes)
        console.log('links:', this.state.links)

        const elem = document.getElementById('mySvg');
        elem.appendChild(this.chart(this.state.nodes, this.state.links));
    }

    drag = (simulation) => {

        function dragStarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x
            d.fy = d.y
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null
        }

        return d3.drag()
                    .on('start', dragStarted)
                    .on('drag', dragged)
                    .on('end', dragEnded);
    }

    chart(nodes, links) {

        const width = 1980;
        const height = 1080;

        const obj_nodes = nodes.map(d => Object.create(d));
        const obj_links = links.map(d => Object.create(d));

        const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

        // what each link looks like
        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.5)
            .selectAll('line')
            .data(obj_links)
            .join('line')
            .attr('stroke-width', d => (Math.sqrt(d.value)));

        const color = (node) => {
            if (node.type === 1) // actor
                return d3.color('blue');
            else
                return d3.color('pink');
        }

        const radius = (node) => {
            if (node.type === 1) // actor = 1
                return 20;
            else // movie = 0
                return 40;
        }

        const simulation = d3.forceSimulation(obj_nodes)
                            .force('link', d3.forceLink().links(obj_links).id(d => {return d.index;}).distance(200))
                            .force('charge', d3.forceManyBody())
                            .force('center', d3.forceCenter(width/2, height/2));

        // what each movie node looks like
        const node = svg.append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(obj_nodes)
            .join('circle')
            .attr('r', radius)
            .attr('fill', color)
            .call(this.drag(simulation));

        // updates node and link positions
        simulation.on('tick', () => {
            link.attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });

        return svg.node();
    }


    render() {
        return (
            <div>

                <div className='title'>
                    <h1>Movie Graph</h1>
                </div>

                <div className='lowerBody'><div className='article'>
                    
                <div id='mySvg'> 

                </div>
                            
                </div></div> 
            </div>
        );
    }
}

export default MovieGraph;