/* Agence Ruelas — itineraries + Wikimedia Commons galleries (free licences). */
(function () {
  const n = function (pt, en, fr, es) { return { pt: pt, en: en, fr: fr, es: es }; };
  const p = function (file, pt, en, fr, es) { return { file: file, cap: n(pt, en, fr, es) }; };

  window.RUELAS.TOURS = [
    {
      id: 'sintra-cascais',
      durationH: 8,
      image: wikiPhoto('Sintra Portugal Palácio da Pena-01.jpg'),
      title: n('Sintra, Palácio da Pena & Cascais', 'Sintra, Pena Palace & Cascais', 'Sintra, Palais de Pena & Cascais', 'Sintra, Palacio de Pena y Cascais'),
      desc: n(
        'Dia completo: Palácio da Pena, Castelo dos Mouros, centro de Sintra, Regaleira, Cabo da Roca e Cascais.',
        'Full day: Pena Palace, Moorish Castle, historic Sintra, Regaleira, Cabo da Roca and Cascais.',
        'Journée complète : Palais de Pena, château des Maures, Sintra, Regaleira, Cabo da Roca et Cascais.',
        'Día completo: Palacio de Pena, Castillo de los Moros, Sintra, Regaleira, Cabo da Roca y Cascais.'
      ),
      includes: {
        pt: ['Motorista privado', 'Paragens fotográficas em cada sítio', 'Cabo da Roca', 'Tempo livre em Cascais'],
        en: ['Private driver', 'Photo stops at each site', 'Cabo da Roca', 'Free time in Cascais'],
        fr: ['Chauffeur privé', 'Arrêts photo à chaque étape', 'Cabo da Roca', 'Temps libre à Cascais'],
        es: ['Chófer privado', 'Paradas foto en cada sitio', 'Cabo da Roca', 'Tiempo libre en Cascais']
      },
      private: [{ pax: '1–3', price: 280 }, { pax: '4–7', price: 340 }],
      sharedPerPerson: 75,
      sharedMin: 4,
      stops: [
        {
          id: 'pena',
          name: n('Palácio da Pena', 'Pena Palace', 'Palais de Pena', 'Palacio de Pena'),
          photos: [
            p('Sintra Portugal Palácio da Pena-01.jpg', 'Fachada colorida do Palácio Nacional da Pena', 'Colourful façade of Pena National Palace', 'Façade colorée du Palais national de Pena', 'Fachada colorida del Palacio Nacional de Pena'),
            p('Palacio Nacional da Pena, Sintra, Portugal, 2019-05-25, DD 142-144 PAN.jpg', 'Pena visto da serra de Sintra', 'Pena from the Sintra hills', 'Pena vue depuis la sierra de Sintra', 'Pena desde la sierra de Sintra'),
            p('Palacio Nacional da Pena, Sintra, Portugal, 2019-05-25, DD 140-141 PAN.jpg', 'Torres e ameias do palácio', 'Towers and battlements of the palace', 'Tours et créneaux du palais', 'Torres y almenas del palacio'),
            p('Wooden Entrance Door, Palácio da Pena.jpg', 'Portal e pormenor da entrada', 'Entrance portal, architectural detail', 'Portail et détail de l’entrée', 'Portal y detalle de la entrada'),
            p('Courtyard of Palácio Nacional da Pena P1000449.JPG', 'Pátio interior do palácio', 'Inner courtyard of the palace', 'Cour intérieure du palais', 'Patio interior del palacio')
          ]
        },
        {
          id: 'mouros',
          name: n('Castelo dos Mouros', 'Moorish Castle', 'Château des Maures', 'Castillo de los Moros'),
          photos: [
            p('Castelo dos Mouros, Sintra, Portugal, 2019-05-25, DD 112-121 PAN.jpg', 'Muralhas do Castelo dos Mouros sobre Sintra', 'Moorish Castle walls above Sintra', 'Remparts du château des Maures au-dessus de Sintra', 'Murallas del Castillo de los Moros sobre Sintra'),
            p('Castelo dos Mouros. Sintra, Portugal.jpg', 'Caminho nas muralhas com vista para a serra', 'Wall walk with views over the hills', 'Chemin de ronde et vue sur la sierra', 'Camino de ronda con vistas a la sierra'),
            p('Castelo dos Mouros, Sintra, Portugal, 2019-05-25, DD 79.jpg', 'Torre e recinto muralhado', 'Tower and walled enclosure', 'Tour et enceinte fortifiée', 'Torre y recinto amurallado'),
            p('Castelo dos Mouros, Sintra, Portugal, 2019-05-25, DD 85.jpg', 'Panorama a partir do castelo', 'Panorama from the castle', 'Panorama depuis le château', 'Panorama desde el castillo')
          ]
        },
        {
          id: 'sintra-town',
          name: n('Palácio Nacional de Sintra', 'Sintra National Palace', 'Palais national de Sintra', 'Palacio Nacional de Sintra'),
          photos: [
            p('Palacio Sintra February 2015-12a.jpg', 'Palácio Nacional e as chaminés cónicas', 'National Palace and its conical chimneys', 'Palais national et ses cheminées coniques', 'Palacio Nacional y sus chimeneas cónicas'),
            p('Palacio Nacional, Sintra, Portugal, 2019-05-25, DD 89.jpg', 'Fachada do palácio no centro histórico', 'Palace façade in the historic centre', 'Façade du palais dans le centre historique', 'Fachada del palacio en el casco histórico'),
            p('Palacio Nacional, Sintra, Portugal, 2019-05-25, DD 08.jpg', 'Pátio e ala manuelina', 'Courtyard and Manueline wing', 'Cour et aile manuéline', 'Patio y ala manuelina'),
            p('Palacio Nacional, Sintra, Portugal, 2019-05-25, DD 13.jpg', 'Pormenor arquitectónico do palácio', 'Architectural detail of the palace', 'Détail architectural du palais', 'Detalle arquitectónico del palacio')
          ]
        },
        {
          id: 'regaleira',
          name: n('Quinta da Regaleira', 'Quinta da Regaleira', 'Quinta da Regaleira', 'Quinta da Regaleira'),
          photos: [
            p('Initiation Well in Quinta da Regaleira - Sintra (16277476688).jpg', 'Poço iniciático da Regaleira', 'Initiation well at Regaleira', 'Puits initiatique de la Regaleira', 'Pozo iniciático de la Regaleira'),
            p('Quinta da Regaleira Initiation Well Top-Down (48680309187).jpg', 'Poço visto de cima — espiral de pedra', 'Well from above — stone spiral', 'Puits vu du haut — spirale de pierre', 'Pozo visto desde arriba — espiral de piedra'),
            p('Quinta da Regaleira Initiation Well Bottom-Up (48680367447).jpg', 'Poço visto do fundo', 'Well seen from the bottom', 'Puits vu depuis le fond', 'Pozo visto desde el fondo'),
            p('The gardens of the Quinta da Regaleira - Initiation Well (34322961886).jpg', 'Jardins mistérios da Quinta da Regaleira', 'Mysterious gardens of Quinta da Regaleira', 'Jardins mystérieux de la Quinta da Regaleira', 'Jardines misteriosos de la Quinta da Regaleira')
          ]
        },
        {
          id: 'monserrate',
          name: n('Palácio de Monserrate', 'Monserrate Palace', 'Palais de Monserrate', 'Palacio de Monserrate'),
          photos: [
            p('Palácio de Monserrate DSC08898 (36986223231).jpg', 'Palácio de Monserrate e jardim romântico', 'Monserrate Palace and romantic garden', 'Palais de Monserrate et jardin romantique', 'Palacio de Monserrate y jardín romántico'),
            p('Palácio de Monserrate - Sintra - Portugal (9777878001).jpg', 'Fachada orientalista de Monserrate', 'Orientalist façade of Monserrate', 'Façade orientaliste de Monserrate', 'Fachada orientalista de Monserrate'),
            p('Palácio de Monserrate - Sintra - Portugal (4160180592).jpg', 'Parque e palácio de Monserrate', 'Monserrate park and palace', 'Parc et palais de Monserrate', 'Parque y palacio de Monserrate'),
            p('Parque Monserrate (6).jpg', 'Jardim botânico do Parque de Monserrate', 'Botanical garden of Monserrate Park', 'Jardin botanique du parc de Monserrate', 'Jardín botánico del Parque de Monserrate')
          ]
        },
        {
          id: 'roca',
          name: n('Cabo da Roca', 'Cabo da Roca', 'Cabo da Roca', 'Cabo da Roca'),
          photos: [
            p('Portugal Cabo-da-Roca-Lighthouse-03.jpg', 'Farol no ponto mais ocidental da Europa continental', 'Lighthouse at the westernmost point of continental Europe', 'Phare au point le plus occidental de l’Europe continentale', 'Faro en el punto más occidental de la Europa continental'),
            p('Cabo da Roca Lighthouse, 20250606 1514 0234.jpg', 'Falésias do Cabo da Roca', 'Cabo da Roca cliffs', 'Falaises du Cabo da Roca', 'Acantilados de Cabo da Roca'),
            p('Cabo da Roca Lighthouse, 20250606 1539 0306.jpg', 'Oceano Atlântico a partir do cabo', 'Atlantic Ocean from the cape', 'Océan Atlantique depuis le cap', 'Océano Atlántico desde el cabo'),
            p('Cabo da Roca Lighthouse, 20250606 1516 0240.jpg', 'Farol e vegetação costeira', 'Lighthouse and coastal vegetation', 'Phare et végétation côtière', 'Faro y vegetación costera')
          ]
        },
        {
          id: 'cascais-bay',
          name: n('Cascais — baía', 'Cascais bay', 'Baie de Cascais', 'Bahía de Cascais'),
          photos: [
            p('Marina de Cascais (Portugal).jpg', 'Marina e baía de Cascais', 'Cascais marina and bay', 'Marina et baie de Cascais', 'Marina y bahía de Cascais'),
            p('The Cascais marina (6599201111).jpg', 'Embarcações na marina de Cascais', 'Boats in Cascais marina', 'Bateaux dans la marina de Cascais', 'Barcos en la marina de Cascais'),
            p('Cascais - Portugal 012.jpg', 'Frente marítima de Cascais', 'Cascais seafront', 'Front de mer de Cascais', 'Frente marítimo de Cascais')
          ]
        }
      ]
    },
    {
      id: 'cascais-estoril',
      durationH: 5,
      image: wikiPhoto('Marina de Cascais (Portugal).jpg'),
      title: n('Cascais, Estoril & Costa do Sol', 'Cascais, Estoril & Sunny Coast', 'Cascais, Estoril & Costa do Sol', 'Cascais, Estoril y Costa del Sol'),
      desc: n(
        'Meio-dia na costa: marina e cidadela de Cascais, farol de Santa Marta, Boca do Inferno, Guincho e Estoril.',
        'Half day on the coast: Cascais marina and citadel, Santa Marta lighthouse, Boca do Inferno, Guincho and Estoril.',
        'Demi-journée sur la côte : marina et citadelle de Cascais, phare de Santa Marta, Boca do Inferno, Guincho et Estoril.',
        'Media jornada en la costa: marina y ciudadela de Cascais, faro de Santa Marta, Boca do Inferno, Guincho y Estoril.'
      ),
      includes: {
        pt: ['Percurso costeiro', 'Paragens fotográficas', 'Regresso ao hotel'],
        en: ['Coastal route', 'Photo stops', 'Return to hotel'],
        fr: ['Parcours côtier', 'Arrêts photo', 'Retour à l’hôtel'],
        es: ['Ruta costera', 'Paradas foto', 'Regreso al hotel']
      },
      private: [{ pax: '1–3', price: 180 }, { pax: '4–7', price: 220 }],
      sharedPerPerson: 55,
      sharedMin: 4,
      stops: [
        {
          id: 'cascais-marina',
          name: n('Marina de Cascais', 'Cascais Marina', 'Marina de Cascais', 'Marina de Cascais'),
          photos: [
            p('Marina de Cascais (Portugal).jpg', 'Vista geral da marina de Cascais', 'Overview of Cascais marina', 'Vue d’ensemble de la marina de Cascais', 'Vista general de la marina de Cascais'),
            p('Marina de Cascais - Portugal (52377265007).jpg', 'Cais e iates na marina', 'Quays and yachts in the marina', 'Quais et yachts dans la marina', 'Muelles y yates en la marina'),
            p('The Cascais marina (6599201111).jpg', 'Baía de Cascais ao entardecer', 'Cascais bay towards evening', 'Baie de Cascais en fin de journée', 'Bahía de Cascais al atardecer'),
            p('Cascais - Portugal 006.jpg', 'Centro e frente de Cascais', 'Cascais centre and waterfront', 'Centre et front de mer de Cascais', 'Centro y frente de Cascais')
          ]
        },
        {
          id: 'cidadela',
          name: n('Cidadela de Cascais', 'Cascais Citadel', 'Citadelle de Cascais', 'Ciudadela de Cascais'),
          photos: [
            p('Cidadela de Cascais Cascais 02.jpg', 'Muralhas da Cidadela de Cascais', 'Walls of the Cascais Citadel', 'Remparts de la citadelle de Cascais', 'Murallas de la Ciudadela de Cascais'),
            p('Cidadela de Cascais Cascais 01.jpg', 'Recinto da cidadela', 'Citadel enclosure', 'Enceinte de la citadelle', 'Recinto de la ciudadela'),
            p('Cidadela de Cascais, Palácio, 03.jpg', 'Palácio da Cidadela', 'Citadel Palace', 'Palais de la citadelle', 'Palacio de la Ciudadela')
          ]
        },
        {
          id: 'santa-marta',
          name: n('Farol de Santa Marta', 'Santa Marta Lighthouse', 'Phare de Santa Marta', 'Faro de Santa Marta'),
          photos: [
            p('Faro de Santa Marta, Cascais, Portugal, 2022-07-25, DD 13-15 HDR.jpg', 'Farol de Santa Marta e museu do mar', 'Santa Marta lighthouse and sea museum', 'Phare de Santa Marta et musée de la mer', 'Faro de Santa Marta y museo del mar'),
            p('Faro de Santa Marta, Cascais, Portugal, 2022-07-25, DD 09-11 HDR.jpg', 'Farol branco e azul sobre o Atlântico', 'Blue-and-white lighthouse above the Atlantic', 'Phare bleu et blanc au-dessus de l’Atlantique', 'Faro blanco y azul sobre el Atlántico')
          ]
        },
        {
          id: 'boca',
          name: n('Boca do Inferno', 'Boca do Inferno', 'Boca do Inferno', 'Boca do Inferno'),
          photos: [
            p('Boca do Inferno, Cascais.jpg', 'Gruta e falésia da Boca do Inferno', 'Cave and cliff at Boca do Inferno', 'Grotte et falaise de la Boca do Inferno', 'Gruta y acantilado de Boca do Inferno'),
            p('Cascais - Boca do Inferno (53854438774).jpg', 'Rebentação nas rochas', 'Surf crashing on the rocks', 'Vagues contre les rochers', 'Oleaje contra las rocas'),
            p('Boca do Inferno (Cascais) YGD2.jpg', 'Vista da costa a partir da Boca do Inferno', 'Coastal view from Boca do Inferno', 'Vue côtière depuis la Boca do Inferno', 'Vista costera desde Boca do Inferno')
          ]
        },
        {
          id: 'guincho',
          name: n('Praia do Guincho', 'Guincho Beach', 'Plage du Guincho', 'Playa del Guincho'),
          photos: [
            p('Guincho May 2012-2.jpg', 'Praia do Guincho e dunas', 'Guincho beach and dunes', 'Plage du Guincho et dunes', 'Playa del Guincho y dunas'),
            p('Guincho June 2013-4.jpg', 'Guincho com a serra de Sintra ao fundo', 'Guincho with the Sintra hills beyond', 'Guincho avec la sierra de Sintra au loin', 'Guincho con la sierra de Sintra al fondo'),
            p('Guincho June 2013-1.jpg', 'Areia e Atlântico no Guincho', 'Sand and Atlantic at Guincho', 'Sable et Atlantique au Guincho', 'Arena y Atlántico en el Guincho')
          ]
        },
        {
          id: 'estoril',
          name: n('Estoril & Tamariz', 'Estoril & Tamariz', 'Estoril et Tamariz', 'Estoril y Tamariz'),
          photos: [
            p('Casino Estoril.jpg', 'Casino do Estoril', 'Estoril Casino', 'Casino d’Estoril', 'Casino de Estoril'),
            p('Casino Estoril 2024.jpg', 'Esplanada do casino', 'Casino esplanade', 'Esplanade du casino', 'Explanada del casino'),
            p('Tamariz, Estoril (DSC03433).jpg', 'Praia do Tamariz, Estoril', 'Tamariz beach, Estoril', 'Plage de Tamariz, Estoril', 'Playa de Tamariz, Estoril'),
            p('Praia do Tamariz, Estoril, Portugal, 2022-07-26, DD 16-18 HDR.jpg', 'Promenade e praia do Tamariz', 'Tamariz promenade and beach', 'Promenade et plage de Tamariz', 'Paseo y playa de Tamariz')
          ]
        }
      ]
    },
    {
      id: 'fatima-obidos',
      durationH: 9,
      image: wikiPhoto('Fatima BW 2018-10-07 08-58-30 s v1.jpg'),
      title: n('Fátima & Óbidos', 'Fátima & Óbidos', 'Fátima & Óbidos', 'Fátima y Óbidos'),
      desc: n(
        'Santuário de Fátima e a vila medieval muralhada de Óbidos. Dia completo a partir de Lisboa.',
        'Fátima Sanctuary and the walled medieval town of Óbidos. Full day from Lisbon.',
        'Sanctuaire de Fátima et village médiéval d’Óbidos. Journée complète depuis Lisbonne.',
        'Santuario de Fátima y villa medieval de Óbidos. Día completo desde Lisboa.'
      ),
      includes: {
        pt: ['Santuário de Fátima', 'Óbidos intramuros', 'Motorista dedicado'],
        en: ['Fátima Sanctuary', 'Óbidos old town', 'Dedicated driver'],
        fr: ['Sanctuaire de Fátima', 'Óbidos', 'Chauffeur dédié'],
        es: ['Santuario de Fátima', 'Óbidos', 'Chófer dedicado']
      },
      private: [{ pax: '1–3', price: 320 }, { pax: '4–7', price: 390 }],
      sharedPerPerson: 85,
      sharedMin: 4,
      stops: [
        {
          id: 'fatima',
          name: n('Santuário de Fátima', 'Sanctuary of Fátima', 'Sanctuaire de Fátima', 'Santuario de Fátima'),
          photos: [
            p('Fatima BW 2018-10-07 08-58-30 s v1.jpg', 'Basílica de Nossa Senhora do Rosário', 'Basilica of Our Lady of the Rosary', 'Basilique Notre-Dame du Rosaire', 'Basílica de Nuestra Señora del Rosario'),
            p('Santuário de Fátima by Juntas 3.jpg', 'Esplanada do Santuário de Fátima', 'Fátima Sanctuary esplanade', 'Esplanade du sanctuaire de Fátima', 'Explanada del Santuario de Fátima'),
            p('Santuário de Fátima by Juntas 4.jpg', 'Recinto do santuário', 'Sanctuary precinct', 'Enceinte du sanctuaire', 'Recinto del santuario'),
            p('Capelinha das Aparições de Fátima.jpg', 'Capelinha das Aparições', 'Chapel of the Apparitions', 'Chapelle des Apparitions', 'Capilla de las Apariciones'),
            p('Capelinha das Aparições, 2011.jpg', 'Capelinha no coração do santuário', 'Chapel at the heart of the sanctuary', 'Chapelle au cœur du sanctuaire', 'Capilla en el corazón del santuario'),
            p('Basílica da Santíssima Trindade - Fátima - Portugal (20484732036).jpg', 'Basílica da Santíssima Trindade', 'Basilica of the Holy Trinity', 'Basilique de la Sainte Trinité', 'Basílica de la Santísima Trinidad')
          ]
        },
        {
          id: 'obidos',
          name: n('Óbidos medieval', 'Medieval Óbidos', 'Óbidos médiévale', 'Óbidos medieval'),
          photos: [
            p('Óbidos - Castle walls (53199958620).jpg', 'Muralhas de Óbidos', 'Óbidos town walls', 'Remparts d’Óbidos', 'Murallas de Óbidos'),
            p('The Óbidos\' Castle (4017081137).jpg', 'Castelo de Óbidos', 'Óbidos Castle', 'Château d’Óbidos', 'Castillo de Óbidos'),
            p('A walk along the walls of Óbidos IV (40565055805).jpg', 'Passeio sobre as muralhas', 'Walk along the ramparts', 'Promenade sur les remparts', 'Paseo por las murallas'),
            p('A walk along the walls of Óbidos V (40565052705).jpg', 'Vista da vila a partir das muralhas', 'View of the town from the walls', 'Vue du village depuis les remparts', 'Vista de la villa desde las murallas'),
            p('Rua Direita Óbidos 04.jpg', 'Rua Direita intramuros', 'Rua Direita inside the walls', 'Rua Direita intramuros', 'Rua Direita intramuros'),
            p('Rua Direita Óbidos 01.jpg', 'Casas caiadas e flores em Óbidos', 'Whitewashed houses and flowers in Óbidos', 'Maisons blanchies et fleurs à Óbidos', 'Casas encaladas y flores en Óbidos')
          ]
        }
      ]
    },
    {
      id: 'lisbon-belem',
      durationH: 4,
      image: wikiPhoto('Torre Belém April 2009-4a.jpg'),
      title: n('Lisboa histórica & Belém', 'Historic Lisbon & Belém', 'Lisbonne historique & Belém', 'Lisboa histórica y Belém'),
      desc: n(
        'Belém (torre, Jerónimos, Padrão), Alfama e elétrico 28, Castelo de São Jorge, miradouros e a baixa pombalina.',
        'Belém (tower, Jerónimos, Monument to the Discoveries), Alfama and tram 28, São Jorge Castle, viewpoints and downtown Lisbon.',
        'Belém (tour, Hiéronymites, Padrão), Alfama et tram 28, château Saint-Georges, miradouros et Baixa.',
        'Belém (torre, Jerónimos, Padrão), Alfama y tranvía 28, Castillo de San Jorge, miradores y la Baixa.'
      ),
      includes: {
        pt: ['Belém', 'Alfama', 'Miradouros', 'Paragens fotográficas'],
        en: ['Belém', 'Alfama', 'Viewpoints', 'Photo stops'],
        fr: ['Belém', 'Alfama', 'Belvédères', 'Arrêts photo'],
        es: ['Belém', 'Alfama', 'Miradores', 'Paradas foto']
      },
      private: [{ pax: '1–3', price: 140 }, { pax: '4–7', price: 180 }],
      sharedPerPerson: 45,
      sharedMin: 4,
      stops: [
        {
          id: 'belem-tower',
          name: n('Torre de Belém', 'Belém Tower', 'Tour de Belém', 'Torre de Belém'),
          photos: [
            p('Torre Belém April 2009-4a.jpg', 'Torre de Belém no Tejo', 'Belém Tower on the Tagus', 'Tour de Belém sur le Tage', 'Torre de Belém en el Tajo'),
            p('Lisbon Torre de Belém BW 2018-10-03 16-33-21.jpg', 'Torre de Belém, alçado sobre o rio', 'Belém Tower rising above the river', 'Tour de Belém au-dessus du fleuve', 'Torre de Belém sobre el río'),
            p('Lisbon Torre de Belém BW 2018-10-03 16-34-03.jpg', 'Pormenor manuelino da torre', 'Manueline detail of the tower', 'Détail manuélin de la tour', 'Detalle manuelino de la torre'),
            p('Lisbon Torre de Belém BW 2018-10-03 16-35-17.jpg', 'Torre e margem do Tejo', 'Tower and Tagus waterfront', 'Tour et rive du Tage', 'Torre y orilla del Tajo')
          ]
        },
        {
          id: 'jeronimos',
          name: n('Mosteiro dos Jerónimos', 'Jerónimos Monastery', 'Monastère des Hiéronymites', 'Monasterio de los Jerónimos'),
          photos: [
            p('Monasterio de los Jerónimos, Lisboa, Portugal, 2022-07-24, DD 38-40 HDR.jpg', 'Mosteiro dos Jerónimos, Belém', 'Jerónimos Monastery, Belém', 'Monastère des Hiéronymites, Belém', 'Monasterio de los Jerónimos, Belém'),
            p('Cloister of the Jerónimos Monastery in Belém, Lisbon, 20250604 1313 9204.jpg', 'Claustro dos Jerónimos', 'Jerónimos cloister', 'Cloître des Hiéronymites', 'Claustro de los Jerónimos'),
            p('View of Mosteiro dos Jerónimos from Monument of the Discoveries, Belém, Lisbon, 20250604 1111 9124.jpg', 'Mosteiro visto a partir do Padrão', 'Monastery seen from the Monument to the Discoveries', 'Monastère vu depuis le Padrão', 'Monasterio visto desde el Padrón')
          ]
        },
        {
          id: 'padrao',
          name: n('Padrão dos Descobrimentos', 'Monument to the Discoveries', 'Monument des Découvertes', 'Padrón de los Descubrimientos'),
          photos: [
            p('Padrão dos Descobrimentos por Rodrigo Tetsuo Argenton.jpg', 'Padrão dos Descobrimentos, Belém', 'Monument to the Discoveries, Belém', 'Monument des Découvertes, Belém', 'Padrón de los Descubrimientos, Belém'),
            p('Belem - Padrao dos Descobrimentos.jpg', 'Padrão junto ao Tejo', 'Monument beside the Tagus', 'Padrão au bord du Tage', 'Padrón junto al Tajo'),
            p('Monument of the Discoveries in Belém, Lisbon, 20250607 1022 0430.jpg', 'Proa do Padrão e figuras dos Descobrimentos', 'Prow of the monument and figures of the Discoveries', 'Proue du monument et figures des Découvertes', 'Proa del padrón y figuras de los Descubrimientos')
          ]
        },
        {
          id: 'maat',
          name: n('MAAT, Belém', 'MAAT, Belém', 'MAAT, Belém', 'MAAT, Belém'),
          photos: [
            p('MAAT Museum of Art Architecture and Technology Lisbon.jpg', 'MAAT — Museu de Arte, Arquitetura e Tecnologia', 'MAAT — Museum of Art, Architecture and Technology', 'MAAT — musée d’Art, d’Architecture et de Technologie', 'MAAT — Museo de Arte, Arquitectura y Tecnología'),
            p('Panorama view of the outside of MAAT museum in Lisbon.jpg', 'Curva do edifício MAAT sobre o Tejo', 'Curve of the MAAT building on the Tagus', 'Courbe du MAAT au-dessus du Tage', 'Curva del MAAT sobre el Tajo')
          ]
        },
        {
          id: 'alfama',
          name: n('Alfama & elétrico 28', 'Alfama & tram 28', 'Alfama et tram 28', 'Alfama y tranvía 28'),
          photos: [
            p('Lisbon in a day - Tram 28 Alfama (39271341600).jpg', 'Elétrico 28 a atravessar Alfama', 'Tram 28 running through Alfama', 'Tram 28 dans les rues d’Alfama', 'Tranvía 28 cruzando Alfama'),
            p('Tram on line 28 passing through a street in Alfama, Lisbon.jpg', 'Elétrico na rua estreita de Alfama', 'Tram in a narrow Alfama street', 'Tram dans une ruelle d’Alfama', 'Tranvía en una calle estrecha de Alfama'),
            p('Tram Line 28 in Alfama (50661758033).jpg', 'Linha 28 entre fachadas tradicionais', 'Line 28 between traditional façades', 'Ligne 28 entre façades traditionnelles', 'Línea 28 entre fachadas tradicionales')
          ]
        },
        {
          id: 'miradouro',
          name: n('Miradouro da Senhora do Monte', 'Senhora do Monte viewpoint', 'Belvédère de Senhora do Monte', 'Mirador de Senhora do Monte'),
          photos: [
            p('Miradouro Nossa Senhora do Monte II.jpg', 'Vista de Lisboa a partir da Senhora do Monte', 'Lisbon from Senhora do Monte', 'Lisbonne depuis Senhora do Monte', 'Lisboa desde Senhora do Monte'),
            p('Lisbon panoramic view from Miradouro da Senhora do Monte (49648892693).jpg', 'Panorama sobre a cidade e o Tejo', 'Panorama over the city and the Tagus', 'Panorama sur la ville et le Tage', 'Panorama sobre la ciudad y el Tajo'),
            p('Miradouro Nossa Senhora do Monte I.jpg', 'Miradouro e horizonte de Lisboa', 'Viewpoint and Lisbon skyline', 'Belvédère et horizon de Lisbonne', 'Mirador y horizonte de Lisboa')
          ]
        },
        {
          id: 'castelo',
          name: n('Castelo de São Jorge', 'São Jorge Castle', 'Château Saint-Georges', 'Castillo de San Jorge'),
          photos: [
            p('Castelo de São Jorge, Lisbon, 20250604 1706 9397.jpg', 'Castelo de São Jorge sobre Alfama', 'São Jorge Castle above Alfama', 'Château Saint-Georges au-dessus d’Alfama', 'Castillo de San Jorge sobre Alfama'),
            p('View of Castelo de São Jorge from São Pedro de Alcântara, Lisbon, 20250604 1614 9358.jpg', 'Castelo visto de São Pedro de Alcântara', 'Castle from São Pedro de Alcântara', 'Château vu de São Pedro de Alcântara', 'Castillo visto desde São Pedro de Alcântara'),
            p('Torre do Paço, Castelo de São Jorge, Lisbon, 20250604 1656 9381.jpg', 'Torre do Paço no recinto do castelo', 'Palace tower inside the castle', 'Tour du palais dans l’enceinte du château', 'Torre del palacio en el recinto del castillo')
          ]
        },
        {
          id: 'comercio',
          name: n('Praça do Comércio', 'Praça do Comércio', 'Place du Commerce', 'Plaza del Comercio'),
          photos: [
            p('View of Praça do Comércio from the Tagus River in Lisbon, 20250604 2038 9656.jpg', 'Praça do Comércio vista do Tejo', 'Praça do Comércio from the Tagus', 'Place du Commerce vue du Tage', 'Plaza del Comercio vista desde el Tajo'),
            p('Arco Triunfal da Rua Augusta, Plaza del Comercio, Lisboa, Portugal, 2012-05-12, DD 02.JPG', 'Arco da Rua Augusta', 'Rua Augusta Arch', 'Arc de la Rua Augusta', 'Arco de la Rua Augusta'),
            p('Lissabon - Praca do Comercio - Arcades.jpg', 'Arcadas da Praça do Comércio', 'Arcades of Praça do Comércio', 'Arcades de la place du Commerce', 'Soportales de la Plaza del Comercio')
          ]
        },
        {
          id: 'santa-justa',
          name: n('Elevador de Santa Justa', 'Santa Justa Lift', 'Ascenseur de Santa Justa', 'Elevador de Santa Justa'),
          photos: [
            p('Lisbon (Lisboa) historic elevator Santa Justa Luca Galuzzi 2006.jpg', 'Elevador de Santa Justa, Baixa', 'Santa Justa Lift, downtown Lisbon', 'Ascenseur de Santa Justa, Baixa', 'Elevador de Santa Justa, Baixa'),
            p('Elevador de Santa Justa, Lisboa, Portugal, 2022-07-24, DD 06.jpg', 'Torre neogótica do elevador', 'Neo-Gothic tower of the lift', 'Tour néogothique de l’ascenseur', 'Torre neogótica del elevador'),
            p('Elevador de Santa Justa, Lisboa, Portugal, 2022-07-24, DD 09.jpg', 'Passadiço e estrutura em ferro', 'Walkway and iron structure', 'Passerelle et structure en fer', 'Pasarela y estructura de hierro')
          ]
        },
        {
          id: 'ponte',
          name: n('Ponte 25 de Abril', '25 de Abril Bridge', 'Pont du 25 Avril', 'Puente 25 de Abril'),
          photos: [
            p('Ponte25Abril1.jpg', 'Ponte 25 de Abril sobre o Tejo', '25 de Abril Bridge over the Tagus', 'Pont du 25 Avril au-dessus du Tage', 'Puente 25 de Abril sobre el Tajo'),
            p('View of Ponte 25 de Abril from the Tagus River, 20250604 1928 9520.jpg', 'Ponte vista a partir do rio', 'Bridge seen from the river', 'Pont vu depuis le fleuve', 'Puente visto desde el río'),
            p('View of Ponte 25 de Abril from the Tagus River, 20250604 1930 9534.jpg', 'Tabuleiro e pilares da ponte', 'Deck and pillars of the bridge', 'Tabier et piliers du pont', 'Tablero y pilares del puente')
          ]
        },
        {
          id: 'cristo-rei',
          name: n('Cristo Rei', 'Cristo Rei', 'Christ-Roi', 'Cristo Rei'),
          photos: [
            p('Cristo Rei, Lisboa, Portugal, 2012-05-12, DD 02.JPG', 'Santuário Nacional de Cristo Rei, Almada', 'Christ the King sanctuary, Almada', 'Sanctuaire du Christ-Roi, Almada', 'Santuario de Cristo Rei, Almada'),
            p('Cristo Rei - Lissabon View - 1.jpg', 'Cristo Rei com Lisboa ao fundo', 'Cristo Rei with Lisbon beyond', 'Christ-Roi avec Lisbonne au loin', 'Cristo Rei con Lisboa al fondo'),
            p('Cristo Rei - Cacilhas View.jpg', 'Vista a partir de Cacilhas', 'View from Cacilhas', 'Vue depuis Cacilhas', 'Vista desde Cacilhas')
          ]
        }
      ]
    }
  ];
})();
