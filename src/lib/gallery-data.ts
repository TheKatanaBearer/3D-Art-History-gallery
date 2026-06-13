export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: string;
  image: string;
  history: string;
}

export interface Corridor {
  id: string;
  era: string;
  eraPeriod: string;
  description: string;
  wallColor: string;
  floorColor: string;
  accentColor: string;
  ceilingColor: string;
  paintings: Painting[];
}

export const corridors: Corridor[] = [
  {
    id: "renaissance",
    era: "Renaissance",
    eraPeriod: "1400–1600",
    description: "The Renaissance marked a rebirth of classical learning and artistic innovation. Originating in Italy, this era saw masters like Leonardo, Michelangelo, and Raphael revolutionize art with perspective, anatomical precision, and humanistic ideals. Works from this period celebrate the beauty of the human form and the rediscovery of ancient Greek and Roman aesthetics.",
    wallColor: "#F5E6D3",
    floorColor: "#8B7355",
    accentColor: "#C9A96E",
    ceilingColor: "#E8D5B7",
    paintings: [
      {
        id: "ren-1",
        title: "Lady with Golden Tresses",
        artist: "School of Florence",
        year: "c. 1485",
        image: "/paintings/renaissance/01_madonna.png",
        history: "This exquisite work exemplifies the Florentine mastery of portraiture during the height of the Italian Renaissance. The subject's serene expression and the delicate rendering of her golden hair demonstrate the period's fascination with idealized beauty and classical harmony. The rich warm palette and meticulous attention to fabric detail reflect the influence of the Medici court's patronage, which attracted the finest artists to Florence. The painting's composition follows the pyramidal structure that became a hallmark of Renaissance art, creating a sense of balance and timeless elegance."
      },
      {
        id: "ren-2",
        title: "The Nobleman in Crimson",
        artist: "Lombard Master",
        year: "c. 1508",
        image: "/paintings/renaissance/02_portrait.png",
        history: "A striking example of the sfumato technique perfected in the workshops of Milan, this portrait captures the quiet authority of an Italian nobleman. The subtle gradations of light and shadow across the subject's face create an almost three-dimensional presence, while the rich crimson velvet of his robe speaks to the wealth and power of the Italian courts. The detailed rendering of the hands—a signature element of High Renaissance portraiture—conveys both the sitter's refinement and humanity. This work bridges the gap between the rigid formality of earlier portraits and the psychological depth that would come to define the era."
      },
      {
        id: "ren-3",
        title: "The Festival of Spring",
        artist: "Workshop of Botticelli",
        year: "c. 1482",
        image: "/paintings/renaissance/03_spring.png",
        history: "Inspired by the mythological revival that swept through Florence under the Medici, this painting depicts a lush springtime gathering of classical figures amid a verdant orchard. The flowing garments and graceful poses draw directly from ancient Greek relief sculptures, translated into paint with remarkable delicacy. Each figure represents an allegorical concept—abundance, beauty, and renewal—reflecting the Neoplatonic philosophy that influenced much of the era's greatest art. The botanical accuracy of the flowers and foliage demonstrates the Renaissance commitment to studying the natural world alongside classical ideals."
      },
      {
        id: "ren-4",
        title: "The Marriage Feast",
        artist: "Venetian School",
        year: "c. 1563",
        image: "/paintings/renaissance/04_banquet.png",
        history: "Venetian painters were renowned for their mastery of color, and this grand banquet scene showcases their brilliance. The sumptuous fabrics, gleaming silverware, and architectural splendor create a world of opulent magnificence. Unlike the more austere Florentine tradition, Venetian art embraced sensuality and spectacle, influenced by the city's position as a great maritime trading power with connections to the East. The painting's dramatic use of perspective draws the viewer into the scene, making them almost a guest at this lavish celebration. The composition reflects the Venetian love of pageantry that made the city one of the artistic capitals of Europe."
      },
      {
        id: "ren-5",
        title: "The Ideal City",
        artist: "Urbino School",
        year: "c. 1480",
        image: "/paintings/renaissance/05_architecture.png",
        history: "This remarkable study in mathematical perspective represents the Renaissance obsession with order, proportion, and rational space. Every element—from the perfectly receding colonnades to the geometrically precise floor tiles—demonstrates the era's revolutionary understanding of linear perspective, pioneered by Brunelleschi and codified by Alberti. The painting presents an idealized vision of urban architecture, combining classical Roman elements with contemporary Renaissance design. It stands as both an artistic achievement and a philosophical statement, embodying the humanist belief that reason and mathematical harmony could create a perfect world. Such works influenced city planners and architects for centuries to come."
      }
    ]
  },
  {
    id: "baroque",
    era: "Baroque",
    eraPeriod: "1600–1750",
    description: "The Baroque era brought drama, emotion, and theatrical grandeur to art. Born from the Catholic Counter-Reformation, Baroque artists like Caravaggio, Rembrandt, and Vermeer used dramatic chiaroscuro, dynamic compositions, and intense realism to create works that stirred the soul. Every painting tells a story through light and shadow, pulling viewers into moments of profound revelation.",
    wallColor: "#2C1810",
    floorColor: "#1A0F0A",
    accentColor: "#8B6914",
    ceilingColor: "#1E1410",
    paintings: [
      {
        id: "bar-1",
        title: "The Night Watch",
        artist: "Dutch Golden Age Master",
        year: "c. 1642",
        image: "/paintings/baroque/01_nightwatch.png",
        history: "This dramatic scene of civic guards assembling for patrol captures the essence of Dutch Golden Age painting at its most ambitious. The masterful use of chiaroscuro—deep shadows pierced by brilliant highlights—creates an almost theatrical sense of anticipation and movement. Unlike the static group portraits common at the time, this work bursts with energy: a captain steps forward, a lieutenant gestures, muskets are loaded and fired. The painting revolutionized the group portrait genre by injecting narrative dynamism into what had traditionally been a formal exercise. The subtle lighting that picks out faces and details from the surrounding darkness demonstrates the artist's unparalleled command of light as a storytelling tool."
      },
      {
        id: "bar-2",
        title: "The Glorious Ascension",
        artist: "Flemish School",
        year: "c. 1625",
        image: "/paintings/baroque/02_ascension.png",
        history: "Baroque art was designed to overwhelm the senses and inspire devotion, and this celestial scene achieves both with breathtaking skill. Swirling clouds, billowing drapery, and shafts of golden light create a vision of divine transcendence that embodies the Counter-Reformation's call for emotionally compelling religious art. The dynamic diagonal composition draws the eye upward, mirroring the subject's spiritual ascent. Rubens' influence is evident in the powerful, muscular figures and the sense of continuous motion that pervades the canvas. The painting was intended for a church altarpiece, where its dramatic lighting would have been enhanced by flickering candlelight, creating an immersive spiritual experience."
      },
      {
        id: "bar-3",
        title: "Vanitas Still Life",
        artist: "Leiden School",
        year: "c. 1650",
        image: "/paintings/baroque/03_vanitas.png",
        history: "In the tradition of Dutch vanitas painting, this still life serves as a meditation on the transience of earthly pursuits. The skull—the most direct memento mori—sits alongside an hourglass whose sand has nearly run out, an extinguished candle symbolizing the brevity of life, and scholarly books representing the limits of human knowledge. Every object is rendered with astonishing realism, from the delicate sheen on the skull to the worn leather bindings, yet all point toward the same moral message: worldly achievements are fleeting. The dramatic lighting, with objects emerging from deep shadow into pools of illumination, reinforces the theme of life's fragility, making the viewer an unwilling philosopher."
      },
      {
        id: "bar-4",
        title: "Woman Reading a Letter",
        artist: "Delft School",
        year: "c. 1665",
        image: "/paintings/baroque/04_letter.png",
        history: "This intimate domestic scene captures a moment of private contemplation with extraordinary sensitivity. A young woman stands beside a window, golden light illuminating her face as she reads, her expression suggesting both anticipation and concern. The painting exemplifies the Delft school's mastery of light—the way it falls through the window, catches the edge of a curtain, and transforms ordinary interiors into luminous sanctuaries. Every element serves the narrative: the partially opened window suggests connection to the outside world, while the domestic interior creates a cocoon of privacy. The artist's technique of layering thin glazes creates a pearl-like quality of light that has captivated viewers for over three centuries."
      },
      {
        id: "bar-5",
        title: "The Triumph of the Gods",
        artist: "Roman Baroque Workshop",
        year: "c. 1635",
        image: "/paintings/baroque/05_mythology.png",
        history: "Baroque mythology paintings transformed ancient tales into spectacles of movement and emotion, and this work is no exception. The swirling composition—figures tumbling through clouds, fabrics billowing in celestial winds—captures the moment of divine intervention with operatic grandeur. The painting demonstrates the Baroque fascination with the human body in motion, every muscle and gesture exaggerated for dramatic effect. Rich, saturated colors and theatrical lighting create a sense of otherworldly spectacle that would have adorned the palace of a cardinal or prince. This fusion of classical subject matter with Baroque theatricality represents the era's unique ability to make the ancient world feel vividly alive and emotionally immediate."
      },
      {
        id: "bar-6",
        title: "The Grand Palace Interior",
        artist: "Versailles School",
        year: "c. 1700",
        image: "/paintings/baroque/06_palace.png",
        history: "This magnificent palace interior captures the Baroque era's obsession with grandeur and architectural splendor. The vast marble staircase, gilded mirrors reflecting infinite space, and crystal chandeliers casting prismatic light all speak to an age of absolute monarchy and theatrical display. The painting serves as both documentation and celebration of the palaces that European rulers built to project power and wealth. Every surface gleams with opulence—brocade drapes, polished marble, ornate gilding—creating an environment designed to awe visitors into submission. The precise architectural perspective and attention to decorative detail reflect the era's belief that art, architecture, and power were inseparable aspects of the same cosmic order."
      }
    ]
  },
  {
    id: "romantic",
    era: "Romantic",
    eraPeriod: "1800–1850",
    description: "Romanticism rejected the rationality of the Enlightenment in favor of emotion, imagination, and the sublime. Artists like Caspar David Friedrich, J.M.W. Turner, and Théodore Géricault painted nature at its most overwhelming—storms, mountains, ruins—and found spiritual meaning in solitude and wild landscapes. Every canvas pulses with feeling, inviting viewers to lose themselves in the infinite.",
    wallColor: "#1B2A3D",
    floorColor: "#0F1923",
    accentColor: "#7B4B2A",
    ceilingColor: "#162236",
    paintings: [
      {
        id: "rom-1",
        title: "Wanderer Above the Mist",
        artist: "German Romantic School",
        year: "c. 1818",
        image: "/paintings/romantic/01_wanderer.png",
        history: "Perhaps the quintessential Romantic image, this painting places a solitary figure on a rocky precipice, his back turned to us as he gazes into an endless sea of mist-shrouded mountains. The composition perfectly embodies the Romantic concept of the sublime—the simultaneous experience of awe and terror before nature's vastness. The wanderer's dark silhouette against the luminous fog creates a powerful contrast between human smallness and natural grandeur. His elevated position suggests mastery and contemplation, yet the immensity of the landscape reminds us of our insignificance. This duality—man seeking meaning in an overwhelming world—lies at the heart of the Romantic movement, which found spiritual truth not in institutions but in the direct experience of nature."
      },
      {
        id: "rom-2",
        title: "The Tempest at Sea",
        artist: "British School",
        year: "c. 1842",
        image: "/paintings/romantic/02_storm.png",
        history: "Turner's revolutionary approach to painting storms transformed the way artists represented the raw power of nature. In this work, sea and sky merge into a swirling vortex of paint, with distant ships reduced to fragile specks battling the elements. The loose, almost abstract brushwork was decades ahead of its time, dissolving form into pure atmosphere and light. Critics of the era were both thrilled and disturbed by such apparent chaos, yet the painting captures something essential about the Romantic experience of nature—not as a gentle backdrop, but as a terrifying and magnificent force. The warm golden light breaking through the storm clouds hints at transcendence, suggesting that nature's fury carries its own terrible beauty."
      },
      {
        id: "rom-3",
        title: "The Derby at Epsom",
        artist: "French Romantic School",
        year: "c. 1821",
        image: "/paintings/romantic/03_horses.png",
        history: "This dynamic racing scene captures the raw energy and movement that defined French Romantic painting. The horses thunder forward with muscular intensity, their bodies stretched to the limit, manes and tails streaming behind them in a blur of motion. Géricault's obsession with horses—he spent countless hours at stables and racetracks—produced some of the most convincing equine paintings in art history. The dramatic sky mirrors the terrestrial drama below, with roiling clouds that seem to echo the pounding hooves. This painting embodies the Romantic fascination with physical power, speed, and the untameable spirit of nature, whether in animal or weather form."
      },
      {
        id: "rom-4",
        title: "Gothic Castle at Sunset",
        artist: "Rhine School",
        year: "c. 1835",
        image: "/paintings/romantic/04_castle.png",
        history: "Perched atop a dramatic cliff, this Gothic castle glows in the dying light of a spectacular sunset, its towers and battlements silhouetted against a sky of orange and purple. The painting reflects the Romantic fascination with medieval architecture, ruins, and the passage of time—themes that inspired a generation of painters, poets, and composers. The castle represents an idealized past, a world of chivalry and mystery that seemed infinitely more poetic than the industrial present. The dramatic lighting transforms the scene into something almost supernatural, as if the castle exists between the real world and a realm of memory and dream. Such images fueled the Gothic Revival in architecture and literature throughout the nineteenth century."
      },
      {
        id: "rom-5",
        title: "The Enchanted Forest",
        artist: "Caspian School",
        year: "c. 1830",
        image: "/paintings/romantic/05_forest.png",
        history: "Deep within an ancient forest, moonlight filters through towering trees to create a scene of haunting mystery and beauty. The painting exemplifies the Romantic belief that nature—especially in its wild, untamed forms—was a pathway to the spiritual and the infinite. The forest becomes a cathedral of trees, their massive trunks forming natural columns and their canopy a vaulted ceiling. The soft, diffused light creates an atmosphere of reverent stillness, inviting contemplation and a sense of the uncanny. This work draws on German folklore and fairy tales, where forests were places of transformation and encounter with the supernatural, making visible the Romantic conviction that the natural world was alive with hidden meaning."
      }
    ]
  },
  {
    id: "impressionism",
    era: "Impressionism",
    eraPeriod: "1860–1890",
    description: "Impressionism shattered artistic convention by painting the fleeting effects of light and color rather than precise detail. Monet, Renoir, Degas, and their peers worked outdoors, capturing moments with rapid, visible brushstrokes—sunlight on water, gaslight on faces, shadows that shimmer and dissolve. Their canvases vibrate with life, celebrating the beautiful impermanence of the visible world.",
    wallColor: "#F0EDE5",
    floorColor: "#A09882",
    accentColor: "#6B8E7B",
    ceilingColor: "#E8E4D9",
    paintings: [
      {
        id: "imp-1",
        title: "Water Lilies at Twilight",
        artist: "Giverny School",
        year: "c. 1906",
        image: "/paintings/impressionism/01_lilies.png",
        history: "This luminous study of water lilies floating on a pond captures the essence of Impressionism's revolutionary approach to painting. Rather than depicting the water as a surface, the artist paints it as a mirror reflecting sky, clouds, and vegetation in constantly shifting patterns. The loose, visible brushstrokes dissolve the boundary between reflection and reality, creating an immersive experience of light and color that anticipates abstract art by decades. Painted during the artist's obsessive final years at Giverny, where he produced over 250 studies of the water garden, this work represents the culmination of a lifelong pursuit: capturing the ephemeral play of light on water at a single, unrepeatable moment."
      },
      {
        id: "imp-2",
        title: "Café Terrace at Evening",
        artist: "Montmartre School",
        year: "c. 1886",
        image: "/paintings/impressionism/02_cafe.png",
        history: "The warm glow of gaslight spills from a Parisian café terrace onto the wet cobblestones, creating an intimate world of golden warmth against the cool evening air. This painting captures the essence of modern Parisian life that so captivated the Impressionists—the café as social theater, the street as stage for the comedy and drama of urban existence. The visible brushwork and bold color contrasts show the influence of Japanese prints, which taught the Impressionists to embrace flat areas of color and unconventional compositions. The painting vibrates with the energy of the city at dusk, when the boundaries between public and private, day and night, seem to dissolve in the amber light."
      },
      {
        id: "imp-3",
        title: "Dancers in Rehearsal",
        artist: "Parisian School",
        year: "c. 1878",
        image: "/paintings/impressionism/03_ballet.png",
        history: "Behind the gilded glamour of the Paris Opera lay a world of grueling practice and physical strain, captured here with unsparing honesty and delicate beauty. The dancers stretch and adjust their slippers in a rehearsal room flooded with soft natural light, their movements captured with the precision of someone who spent years observing them. The unusual vantage point—slightly elevated, slightly off-center—reflects the influence of photography and Japanese prints on Impressionist composition. The pastel palette of pinks, blues, and whites evokes the ethereal quality of ballet while the informal poses reveal the discipline behind the art. This painting belongs to a series of over 1,500 works devoted to the ballet, the most sustained investigation of a single subject in Impressionist art."
      },
      {
        id: "imp-4",
        title: "The Garden at Argenteuil",
        artist: "Pontoise School",
        year: "c. 1873",
        image: "/paintings/impressionism/04_garden.png",
        history: "Sunlight dapples through the leaves of garden trees, casting a mosaic of light and shadow across a winding path where a woman with a parasol strolls among brilliant flowers. This painting embodies the Impressionist celebration of everyday pleasure and the beauty of ordinary moments transformed by light. The rapid, fragmented brushstrokes create a shimmering effect that makes the entire surface vibrate with atmospheric energy, as if the painting itself is breathing the same warm summer air. The garden—carefully cultivated yet appearing wonderfully wild—becomes a symbol of the Impressionist paradise: a world where nature and human habitation exist in perfect, sunlit harmony."
      },
      {
        id: "imp-5",
        title: "The Gare Saint-Lazare",
        artist: "Paris School",
        year: "c. 1877",
        image: "/paintings/impressionism/05_station.png",
        history: "Steam and smoke billow through the iron architecture of Paris's Gare Saint-Lazare, dissolving the rigid industrial structure into a dreamscape of atmospheric light. This painting represents the Impressionist engagement with modernity at its most daring—elevating a railway station, symbol of industrial progress, to the status of fine art. The iron and glass canopy becomes a vast prism that fragments and refracts light, while the locomotive steam creates natural effects that rival any cloudscape. The painting demonstrates that beauty could be found in the most contemporary subjects, challenging the academic hierarchy that privileged classical and historical themes. It stands as a manifesto for the art of the modern world."
      },
      {
        id: "imp-6",
        title: "Regatta at Argenteuil",
        artist: "Seine School",
        year: "c. 1874",
        image: "/paintings/impressionism/06_regatta.png",
        history: "Sailboats skim across sparkling blue water under a brilliant summer sky, their white sails catching the wind in a joyful celebration of leisure and light. The painting captures a Sunday regatta on the Seine—the kind of modern leisure activity that became a favorite Impressionist subject, reflecting the democratization of pleasure in the Third Republic. The short, broken brushstrokes of blue, white, and green blend optically to create a sense of shimmering movement that no smooth surface could achieve. The composition's spontaneity and energy mirror the freedom and optimism of the era, when the possibilities of modern life seemed as boundless as the river stretching toward the horizon."
      }
    ]
  },
  {
    id: "modern",
    era: "Modern Art",
    eraPeriod: "1900–1970",
    description: "Modern art broke every rule. From Cubism's fractured perspectives to Surrealism's dreamscapes, from Abstract Expressionism's raw emotion to Pop Art's ironic embrace of commerce, modern artists reinvented what art could be. Each movement was a revolution, challenging viewers to see the world—and themselves—in radically new ways.",
    wallColor: "#F5F5F0",
    floorColor: "#2C2C2C",
    accentColor: "#E63946",
    ceilingColor: "#FAFAF5",
    paintings: [
      {
        id: "mod-1",
        title: "Composition in Red, Blue, and Yellow",
        artist: "De Stijl Movement",
        year: "c. 1930",
        image: "/paintings/modern/01_geometric.png",
        history: "This radical reduction of painting to its most essential elements—primary colors, black lines, and white space—represents one of the most ambitious attempts in art history to create a universal visual language. The De Stijl movement sought nothing less than the harmonization of all art, architecture, and design under a system of geometric abstraction rooted in pure color and straight lines. Influenced by Theosophical ideas about spiritual evolution, the artist believed that this austere vocabulary could express the deepest truths of existence. The seemingly simple composition is in fact the result of years of refinement, with each line and color carefully calibrated to create a dynamic equilibrium that feels simultaneously stable and alive. This work's influence extends far beyond painting, shaping graphic design, architecture, and furniture design for a century."
      },
      {
        id: "mod-2",
        title: "Fragmented Portrait",
        artist: "Cubist School",
        year: "c. 1912",
        image: "/paintings/modern/02_cubist.png",
        history: "Cubism shattered the Renaissance convention of single-point perspective, presenting multiple viewpoints simultaneously within a single canvas. This portrait deconstructs the human face into angular planes that shift and overlap, forcing the viewer to assemble the image from fragments—much as we actually perceive the world through memory, movement, and shifting attention. The muted palette of browns, grays, and ochres reflects the Analytical Cubist approach, where color was subordinated to form. The painting challenges the very nature of representation: if we can never see all sides of an object at once, why should art pretend otherwise? This philosophical rigor, combined with the striking visual innovation, made Cubism the most influential art movement of the twentieth century."
      },
      {
        id: "mod-3",
        title: "Persistence of Memory",
        artist: "Surrealist School",
        year: "c. 1931",
        image: "/paintings/modern/03_surreal.png",
        history: "Melting clocks drape over impossible objects in a dreamlike landscape where the laws of physics and time have been suspended. This iconic Surrealist image draws on the theories of Freud, translating the logic of dreams into paint with meticulous, almost photographic precision. The contrast between the hyperrealistic technique and the impossible subject matter creates a disorienting effect that is central to Surrealism's power—the familiar made strange, the rational made irrational. The barren landscape, with its distant cliffs and still water, creates a sense of infinite isolation, while the soft, drooping watches suggest that time itself has become unreliable. The painting has become one of the most recognized images in modern art, a visual shorthand for the Surrealist belief that reality was merely a thin veneer over a far stranger truth."
      },
      {
        id: "mod-4",
        title: "Autumn Rhythm",
        artist: "New York School",
        year: "c. 1950",
        image: "/paintings/modern/04_expressionist.png",
        history: "Abstract Expressionism marked the moment when the center of the art world shifted from Paris to New York, and this painting embodies the movement's radical freedom. Created by pouring and dripping paint directly onto a canvas laid on the floor, the work eliminates the traditional barriers between artist and artwork, mind and body, control and chance. The resulting web of interlaced lines—some deliberate, some accidental—creates a visual rhythm that suggests both the chaos of nature and the order of music. The artist's physical engagement with the canvas (dancing around it, pouring from above) made the act of painting itself the subject, transforming the canvas into an arena of performance. This approach liberated a generation of artists from the tyranny of representation and opened infinite possibilities for abstract art."
      },
      {
        id: "mod-5",
        title: "Pop Icon Multiplication",
        artist: "Pop Art Movement",
        year: "c. 1962",
        image: "/paintings/modern/05_popart.png",
        history: "Pop Art emerged as both celebration and critique of consumer culture, and this work—using the mechanical technique of Ben-Day dots borrowed from newspaper printing—blurs the line between fine art and commercial reproduction. By multiplying a single image in bold, saturated colors, the artist raises unsettling questions about uniqueness, authenticity, and mass production in an age of mechanical reproduction. The flat, impersonal surface rejects the emotional intensity of Abstract Expressionism, replacing artistic self-expression with cool detachment and ironic commentary. Yet the work's undeniable visual impact—the way those colors sing against each other—suggests that the artist was also seduced by the very culture he was critiquing. This tension between critique and complicity makes Pop Art one of the most intellectually provocative movements of the twentieth century."
      },
      {
        id: "mod-6",
        title: "No. 61 (Rust and Blue)",
        artist: "Color Field School",
        year: "c. 1953",
        image: "/paintings/modern/06_colorfield.png",
        history: "Color Field painting reduces art to its most elemental experience: color itself, encountered as a physical and emotional presence. This vast expanse of deep blue, its edges soft and luminous as if breathing, creates an immersive field that seems to extend beyond the canvas into the viewer's space. The artist intended his paintings to be experienced at close range, where the boundaries between self and artwork dissolve in a contemplative haze of pure color. The emotional intensity of this experience—often described in terms of the sublime or the tragic—reflects the artist's conviction that color could express fundamental truths about the human condition. The soft-edged rectangles of floating color create a sense of infinite depth and spiritual gravity that has moved viewers to tears since the paintings were first exhibited."
      }
    ]
  }
];
