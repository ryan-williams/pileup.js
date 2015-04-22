/* @flow */
'use strict';

var React = require('react'),
    ContigInterval = require('./ContigInterval'),
    TwoBit = require('./TwoBit'),
    BigBed = require('./BigBed'),
    RemoteFile = require('./RemoteFile'),
    Bam = require('./bam'),
    Root = require('./Root'),
    createTwoBitDataSource = require('./TwoBitDataSource'),
    createBigBedDataSource = require('./BigBedDataSource'),
    createBamDataSource = require('./BamDataSource');

var genome = new TwoBit('/hg19.2bit');
var dataSource = createTwoBitDataSource(genome);

var ensembl = new BigBed('/ensGene.bb');
var ensemblDataSource = createBigBedDataSource(ensembl);

var bamFile = new RemoteFile('/test/data/synth3.normal.17.7500000-7515000.bam'),
    baiFile = new RemoteFile('/test/data/synth3.normal.17.7500000-7515000.bam.bai');

var bam = new Bam(bamFile, baiFile);

var bamSource = createBamDataSource(bam);

React.render(<Root referenceSource={dataSource}
                   geneSource={ensemblDataSource}
                   bamSource={bamSource}
                   initialRange={{contig: "chr17", start: 7512444, stop: 7512484}} />,
             document.getElementById('root'));

window.ensembl = ensembl;
window.genome = genome;
window.bam = bam;
window.ContigInterval = ContigInterval;
