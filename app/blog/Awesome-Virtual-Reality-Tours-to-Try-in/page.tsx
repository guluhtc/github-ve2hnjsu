import Link from "next/link";

const content = [
  <p key="intro">It was just a few years ago that COVID-19 severely limited our every move. In some regions, the travel industry is still recovering from the financial shock.</p>,
  <p key="boom">This caused virtual tourism to explode seemingly overnight.</p>,
  <p key="market">In fact, the virtual reality travel industry is projected to surpass $24 billion in value by 2027.</p>,
  <p key="comfort">And today, you can choose from a vast range of travel experiences to enjoy mysterious cultures, colorful wildlife, and the warm embrace of locals from the comfort of your home.</p>,
  <p key="list-intro">Here are 7 awesome digital travel experiences you can enjoy.</p>,
  <h2 key="british-museum">1. The British Museum</h2>,
  <p key="british-museum-desc"><strong>Price:</strong> Free<br/>The British Museum is one of the most impressive displays in the UK and Europe. Now, you can enjoy an interactive experience through different regions, time periods, and civilizations through the Museum's free VR tour available directly through its site.</p>,
  <h2 key="anne-frank">2. Anne Frank House</h2>,
  <p key="anne-frank-desc"><strong>Price:</strong> Free<br/>The Anne Frank House is a major stop in Amsterdam. Travelers can now see this solemn attraction without hopping on a plane or moving at all but still enjoy a stunning walk through Anne Frank's unique story.</p>,
  <h2 key="yosemite">3. The Yosemite Virtual Tour</h2>,
  <p key="yosemite-desc"><strong>Price:</strong> Free<br/>The Yosemite virtual tour is one of the most breathtaking options on our list. In short, this superb display allows you to roam Yosemite National Park and enjoy the area's natural beauty. This tour is available through the park's dedicated website. There are many other awesome virtual tours in the United States. If you ever run into a geo-blocked tour, you may be able to check it out using a <a href="https://surfshark.com/servers/usa" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">VPN server USA</a>.</p>,
  <h2 key="forbidden-city">4. The National Palace Museum & the Forbidden City in Beijing</h2>,
  <p key="forbidden-city-desc"><strong>Price:</strong> Free<br/>A masterpiece of classic Chinese architecture, The National Palace Museum and the surrounding Forbidden City are among the most visited locations in Asia. Virtual travelers can now explore the works and the exquisite scenes without navigating the crowds, thanks to the virtual tours available for both attractions.</p>,
  <h2 key="louvre">5. The Louvre</h2>,
  <p key="louvre-desc"><strong>Price:</strong> Free<br/>An iconic attraction that contains some of the most renowned works of art ever created, the Louvre has a set of stunning virtual tours available for virtual travelers. This includes a virtual tour through the Founding Myths exhibition, which is the very first Petite Galerie looking into the inspiration of film creators.</p>,
  <h2 key="iguazu">6. The Iguazu Waterfalls</h2>,
  <p key="iguazu-desc"><strong>Price:</strong> Free<br/>Argentina is home to Gauchos, fine meat, and mountains, but its most impressive attractions may be the Iguazu Waterfalls located on the north border of the country. You can now explore this magnificent natural landmark through AirPano's virtual tour available at no cost.</p>,
  <h2 key="everest">7. Mount Everest</h2>,
  <p key="everest-desc"><strong>Price:</strong> Free<br/>The highest mountain on Earth, Mount Everest sits at almost 9000 meters above sea level -- but you can now take in its wonderful views and explore this remote region right from the comfort of your home. This interactive tour includes both the North Ridge and South Ridge, plus it highlights other routes travelers can take on the way up.</p>,
  <h2 key="what-is-virtual-tourism">What is Virtual Tourism?</h2>,
  <p key="virtual-tourism-desc">Virtual tourism refers to the act of living travel experiences through digital channels. While well-established, the tourism industry wasn't the first to embrace virtual tours. Real estate agencies and universities have offered the ability to view properties and campuses online for years. As a matter of fact, college virtual tours have gone up by 250% over the last few years. With that said, it's important to understand what channels you can use to explore new destinations remotely.</p>,
  <h2 key="how-to-experience">How Can You Experience Virtual Tourism?</h2>,
  <div key="how-to-experience-desc">Contrary to popular belief, you can actually access virtual reality through a number of gadgets, not only dedicated headsets. It's possible to access virtual travel tours through:
    <ul className="list-disc ml-6">
      <li>Websites</li>
      <li>Mobile apps</li>
      <li>And virtual reality headsets</li>
    </ul>
    It's also important to note that the OS of your device affects whether or not you can access virtual tours. Major operating systems like MacOS, Windows, iOS, and Android all allow for virtual travel experiences. That said, you may run into some issues if you're not using the most updated version of the software. Likewise, you may not be able to access some tours if you're using a device with Chrome OS.
  </div>,
  <h2 key="conclusion">Conclusion</h2>,
  <p key="conclusion-desc">There is no doubt that digital travel experiences can help us learn about exotic destinations and enjoy some of the fine experiences these places have to offer. While still in its early stages, virtual tourism will undoubtedly become a major attraction for travelers who want to live new experiences without leaving the comfort of their homes. There are both free and paid experiences to enjoy, so start browsing your options and immerse yourself in a new reality now!</p>
];

function VRBlogPost() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/blog" className="text-blue-500 mb-4 inline-block">&larr; Back to Blog</Link>
      <h1 className="text-3xl font-bold mb-4">7 Awesome Virtual Reality Tours to Try in 2023</h1>
      {content.map((el, idx) => el)}
    </div>
  );
}

export default VRBlogPost; 