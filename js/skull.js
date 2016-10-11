var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var myPerceptron = new Architect.Perceptron(3,10,1);
var myTrainer = new Trainer(myPerceptron);

var trainingSet = [];
