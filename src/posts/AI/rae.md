---
title: "RAE (Representation Autoencoder)"
date: "2025-11-17"
description: "RAE (Representation Autoencoder) is a novel approach that combines the strengths of advanced encoders and decoders to create a model capable of both understanding and generating high-quality images."
tags: ["AI"]
---

RAEs (Representation Autoencoders) are a novel approach that combines the strengths of advanced encoders and decoders to create a model capable of both understanding and generating high-quality images. By leveraging powerful pre-trained encoders like DINO or MAE, RAEs capture rich semantic representations of images while also enabling effective image reconstruction through a dedicated decoder. In this post, we will explore what led to the development of RAEs, supplementary information, and their applications in generative models.


### Goals and Questions
1. What is VAE?
2. What is VQ-VAE?
3. Why is RAE better than VQ-VAE?

## Foundational Models

### AE & VAE (Variational Autoencoder)
Autoencoders (AEs) are neural networks designed to learn efficient codings of input data. An encoder compresses the input into a latent-space representation (a vector of numbers), and a decoder tries to reconstruct the input from this representation. RAEs are a very advanced form of autoencoders.

### GAN (Generative Adversarial Networks)
GANs consist of two neural networks, a generator and a discriminator, that compete against each other to produce realistic data. The Generator creates fake data, while the Discriminator evaluates its authenticity. Through this adversarial process, GANs generate high-quality synthetic data.

### Diffusion Models
Diffusion models are a class of generative models that learn to generate data by reversing a diffusion. They work by gradually adding noise to the data and then training a model to reverse this process, effectively denoising the data to predict the original input, creating a new image from pure noise.

* What is a Diffusion Transformer (DiT)?
DiT is a diffusion model that uses the transformer architecture instead of traditional convolutional U-Net backbone typically used in diffusion models.

### CLIP (Contrastive Language-Image Pre-training)
CLIP is a neural network trained on a variety of (image, text) pairs. It learns to associate images with their corresponding textual descriptions, enabling it to understand and generate images based on text. CLIP is very good at "understanding" images (semantics) and thus is good at understanding concepts and meaning in images.


## Good Generation / Weak Understanding

### VQ-VAE (Vector Quantized Variational Autoencoder)
VQ-VAE is a type of autoencoder that uses vector quantization to learn discrete latent representations of data. It combines the benefits of variational autoencoders with discrete latent spaces, allowing for more efficient and interpretable representations. Instead of a continuous latent space, VQ-VAE maps inputs to a finite set of learned embeddings, it quantizes the latent space into discrete tokens (like words in language models).

* What is a discrete latent space?
* How is the VQ-VAE different from a normal VAE?


### VQ-GAN (Vector Quantized Generative Adversarial Network)
A VQ-GAN is a generative model that combines the principles of VQ-VAE with GANs. It uses a VQ-VAE architecture to encode images into discrete latent codes and then employs a GAN framework to generate high-quality images from these codes. This approach leverages the strengths of both VQ-VAE's discrete representations and GANs' ability to produce realistic images.

#### VQ-GAN's shortcomings
While VQ-GANs are effective at generating high-quality images, their encoder's representation power was low. The images looked good, but the latent "tokens" didn't capture deep semantic meaning. They are good at texture and structure, but not at understanding concepts.

## Semantic Revolution
While VQ-GANs were mastering generation, a separate field was mastering understanding (DINO, SigLIP, MAE). 

### DINO & MAE
DINO (Self-Distillation with No Labels) and MAE (Masked Autoencoders) are encoders that are trained without text labels (unlike CLIP). They learn by masking out parts of the image and trying to predict the missing parts (MAE) or by self-distillation (DINO). These models learn rich semantic representations of images, capturing high-level concepts and meaning without relying on textual supervision.

* Did DINO replace CLIP, VQ-VAE, and VQ-GAN regarding semantics?

## RAE (Representation Autoencoder)
In the past, people thought understanding(semantics) and generation were incompatible and two separate problems. People thought you needed two separate models: one for understanding (like CLIP, DINO, MAE) and one for generation (like VQ-VAE, VQ-GAN, Diffusion Models). RAE challenges these assumptions by combining both understanding and generation into a single model. 

### Method

1. RAE uses a powerful pre-trained encoder (like DINO or MAE) to capture rich semantic representations of images.
2. Freezes the encoder weights to preserve the learned semantics.
3. Trains a decoder to reconstruct images from the encoder's latent representations.
4. Use a 2-stage training process (perceptual-adversarial) with L1, LPIPS, and GAN losses to ensure high-quality reconstructions.

This RAE is now a single unit (Frozen DINO Encoder + new Decoder) that can both understand and generate images.

## Applications of RAE
We have a very powerful model that can both understand and generate images. We can use this in the best generative model, the Diffusion Transformer (DiT).

Idea: Replace the old, dumb VAE in the DiT with the new, powerful RAE. 

Problem/Obstacle: The DiT was trained with a VAE, so we can't just swap in the RAE. 

Cause: The RAE decoder was trained to work with the DINO encoder's clean latents, but a diffusion model works by denoising. That means that the model must be able to handle "noisy latents" at every step of the generation process.

Fix: This was fixed by adding gaussian noise to the RAE latents during the RAE's decoder training. This makes the RAE decoder 'noise robust' and able to work within the DiT.

## Results of the RAE in DiT

The new DiT with RAE (RAE-DiT) showed significant improvements in image generation quality and speed over the original DiT with VAE. It's better and faster because its latent representations are semantically rich (due to DINO) and faster because DINO's latents are more efficient than VAE's latents.

Proof: We know that the RAE-DiT plays a key role since when we swap it with Pixel-Diffusion, performance drops significantly, showing that DINO plays a key role in the performance boost.


## Summary

In a nutshell, models used to be divided into two camps: those that understood images (like CLIP, DINO, MAE) and those that generated images (like VQ-VAE, VQ-GAN, Diffusion Models). RAE bridges this gap by combining understanding and generation into a single model. By integrating RAE into the Diffusion Transformer (DiT), we achieve superior image generation performance, demonstrating the power of combining semantic understanding with generative capabilities.