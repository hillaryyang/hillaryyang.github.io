---
layout: article
title: "Cybersecurity & Data Privacy"
permalink: /cs/
---

<div class="cs-grid">

  <div class="cs-card">
    <a href="https://arxiv.org/abs/2412.02578" target="_blank" class="cs-card-link">
      <h3 class="cs-card-title">Private Linear Regression</h3>
      <p class="cs-card-description">Evaluating private machine learning frameworks.</p>
      <div class="cs-card-tags">
        <span class="cs-tag">Research</span>
        <span class="cs-tag">Privacy</span>
      </div>
    </a>
  </div>

  <div class="cs-card">
    <a href="https://drive.google.com/file/d/1nhJEaTrUjGRaP1QJOCe-7oGA0AkiNFiy/view?usp=sharing" target="_blank" class="cs-card-link">
      <h3 class="cs-card-title">Video Anonymization for Social Robots</h3>
      <p class="cs-card-description">Investigating VLMs' social reasoning abilities.</p>
      <div class="cs-card-tags">
        <span class="cs-tag">Research</span>
        <span class="cs-tag">Social Robots</span>
      </div>
    </a>
  </div>

</div>

<style>
.cs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .cs-grid { grid-template-columns: 1fr; }
}

.cs-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cs-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cs-card-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none !important;
  color: inherit;
}

.cs-card-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.cs-card-description {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #666;
  font-weight: normal;
}

.cs-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cs-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f0f0f0;
  border-radius: 16px;
  font-size: 0.85rem;
  color: #555;
}
</style>
