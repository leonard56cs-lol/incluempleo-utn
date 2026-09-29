// Gestión de Vacantes (RF-06, RF-07, RF-08, RF-09)
let vacantes = [
  { id: 1, titulo: "Desarrollador Web Jr", empresa: "TechInclusion S.A.", categoria: "Tecnología / Software", ubicacion: "Remoto", desc: "Desarrollo frontend accesible para portales web." },
  { id: 2, titulo: "Auxiliar Administrativo", empresa: "Logística Global", categoria: "Administración", ubicacion: "Presencial", desc: "Atención y organización documental en oficina adaptada." }
];

function initVacantes() {
  renderVacantesList(vacantes);

  document.getElementById('filterCategory')?.addEventListener('change', filterVacantes);
  document.getElementById('filterLocation')?.addEventListener('change', filterVacantes);
  document.getElementById('btnHeroSearch')?.addEventListener('click', searchVacantesFromHero);
}

function renderVacantesList(list) {
  const container = document.getElementById('vacantesList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p>No se encontraron vacantes disponibles.</p>";
    return;
  }

  container.innerHTML = list.map(v => `
    <div class="card">
      <h3>${v.titulo}</h3>
      <p><strong>Empresa:</strong> ${v.empresa}</p>
      <p><strong>Categoría:</strong> ${v.categoria}</p>
      <p><strong>Modalidad:</strong> ${v.ubicacion}</p>
      <p>${v.desc}</p>
      <button class="btn btn-primary mt-1" onclick="postularVacante(${v.id})">Postularse (RF-10)</button>
    </div>
  `).join('');
}

function filterVacantes() {
  const cat = document.getElementById('filterCategory').value;
  const loc = document.getElementById('filterLocation').value;

  const filtered = vacantes.filter(v => {
    const matchCat = !cat || v.categoria === cat;
    const matchLoc = !loc || v.ubicacion === loc;
    return matchCat && matchLoc;
  });

  renderVacantesList(filtered);
}

function searchVacantesFromHero() {
  const query = document.getElementById('heroSearchInput').value.toLowerCase().trim();
  const filtered = vacantes.filter(v => 
    v.titulo.toLowerCase().includes(query) || 
    v.desc.toLowerCase().includes(query) ||
    v.empresa.toLowerCase().includes(query)
  );
  showSection('vacantes');
  renderVacantesList(filtered);
}

function postularVacante(id) {
  alert(`Tu postulación para la vacante #${id} ha sido enviada con éxito.`);
}