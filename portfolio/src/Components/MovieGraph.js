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
                    }

                    // add movie as new node
                    if (newMovie.name !== undefined) {

                        console.log('adding new movie', newMovie)

                        // place into state
                        currentComponent.setState(prevState => ({
                            nodes: [...prevState.nodes, newMovie]
                        }))
                    }

                    if (movieObject.actors !== undefined) {
                        // iterate through movie's actors
                        let newActors = movieObject.actors;
                        let newActorsList = newActors.split(', ');
                        console.log(newActorsList);

                        newActorsList.forEach(a => {
                            
                            let newActor = {
                                type: 1,
                                name: a
                            }
                            
                            console.log('adding new actor', newActor)

                            // if not already a node, add into nodes
                            let currNodeList = currentComponent.state.nodes;
                            if (!currNodeList.includes(newActor)) {
                                currentComponent.setState(prevState => ({
                                    nodes: [...prevState.nodes, newActor]
                                }))
                            }
                        });
                        
                    }
                        
                });
              });
        });

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
        console.log(obj_nodes)
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
            if (node.group === 1) // is a name
                return d3.color('blue');
            else
                return d3.color('pink');
        }

        const radius = (node) => {
            if (node.group === 1) // name
                return 20;
            else
                return 40;
        }

        const simulation = d3.forceSimulation(obj_nodes)
                            .force('link', d3.forceLink().links(links).id(d => {return d.index;}).distance(200))
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

        console.log(link)
        console.log(node)

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